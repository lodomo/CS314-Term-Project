const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const WebSocket = require("ws");

const mongoose = require("mongoose");
const User = require("./models/User");
const Chatroom = require("./models/Chatroom");
const Message = require("./models/Message");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const CLIENT_URL = process.env.CLIENT_URL;
const PORT = process.env.PORT;

mongoose.connect(MONGO_URI);

// Use CORS middleware to allow requests from http://localhost:5173
app.use(
    cors({
        origin: CLIENT_URL,
    }),
);

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Function to ensure the "main" chatroom exists
const ensureMainChatroomExists = async () => {
    try {
        const mainChatroom = await Chatroom.findOne({ name: "main" });
        if (!mainChatroom) {
            const newChatroom = new Chatroom({
                name: "main",
                users: [],
                admin: null,
                messages: [],
            });
            await newChatroom.save();
            console.log("Main chatroom created");
        } else {
            console.log("Loading Main chatroom");
        }
    } catch (error) {
        console.error("Error ensuring main chatroom exists:", error);
    }
};

// Call the function to ensure the main chatroom exists on server start
ensureMainChatroomExists();

app.get("/", (req, res) => {
    res.json("You do not belong here");
});

app.post("/api/login", async (req, res) => {
    const { name, email, picture } = req.body;
    let status_message = "None";

    try {
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ name, email, picture });
            await user.save();

            status_message = "New user created";

            // Add the new user to the main chatroom
            user = await User.findOne({ email });
            const mainChatroom = await Chatroom.findOne({ name: "main" });
            if (!mainChatroom.users.includes(user._id)) {
                mainChatroom.users.push(user._id);
                await mainChatroom.save();

                // Join message
                const message = new Message({
                    content: "Joined the chat",
                    sender: user,
                    chatroom: mainChatroom._id,
                });

                console.log("User joined the chatroom");
                console.log("User", user);
                await message.save();
            }
        } else {
            status_message = "User Logged In";
        }

        console.log(status_message, ":", user);

        res.json({
            message: status_message,
            user,
        });
    } catch (error) {
        console.error("Error processing user data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/api/user/:userId/chatrooms", async (req, res) => {
    try {
        const { userId } = req.params;
        const chatrooms = await Chatroom.find({ users: userId })
            .populate("users")
            .populate("admin")
            .populate("messages");
        console.log("Fetched chatrooms:", chatrooms); // Debug log to verify the response
        res.json(chatrooms);
    } catch (error) {
        console.error("Error fetching chatrooms for user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// New endpoint to get messages for a chatroom
app.get("/api/chatroom/:chatroomId/messages", async (req, res) => {
    try {
        const { chatroomId } = req.params;
        const messages = await Message.find({ chatroom: chatroomId }).populate(
            "sender",
        );
        res.json(messages);
    } catch (error) {
        console.error("Error fetching messages for chatroom:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// New endpoint to create a message
app.post("/api/chatroom/:chatroomId/messages", async (req, res) => {
    try {
        const { chatroomId } = req.params;
        const { content, senderId } = req.body;

        const message = new Message({
            content,
            sender: senderId,
            chatroom: chatroomId,
        });

        const savedMessage = await message.save();

        // Update the chatroom's messages array
        await Chatroom.findByIdAndUpdate(chatroomId, {
            $push: { messages: savedMessage._id }
        });

        const populatedMessage = await Message.populate(savedMessage, {
            path: "sender",
            select: "name",
        });
        // Broadcast the message to all connected clients
        const messageToBroadcast = {
            content: populatedMessage.content,
            sender: { name: populatedMessage.sender.name },
            chatroomId: populatedMessage.chatroom.toString(),
            timestamp: populatedMessage.timestamp,
        };

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(messageToBroadcast));
            }
        });

        res.json(messageToBroadcast);
    } catch (error) {
        console.error("Error creating message:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to create a new chatroom
app.post("/api/chatrooms/create", async (req, res) => {
    const { chatroomName, userId } = req.body; // Expecting name and userId in the request body

    try {
        // Find the user by ID to set as admin
        const adminUser = await User.findById(userId);

        if (!adminUser) {
            return res.status(404).json({ error: "Admin user not found" });
        }

        // Create a new chatroom
        const newChatroom = new Chatroom({
            name: chatroomName,
            admin: adminUser._id,
            users: [adminUser._id], // Add the admin as the first user
        });

        // Save the chatroom to the database
        const savedChatroom = await newChatroom.save();

        const retrieveSaved = await Chatroom.findById(savedChatroom._id)
            .populate("users")
            .populate("admin");

        res.status(201).json(retrieveSaved);
    } catch (error) {
        console.error("Error creating chatroom:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to get the list of all users
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find({}, "_id name email");
        res.status(200).json(users);
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to add a user to a chatroom
app.put("/api/chatrooms/:id/addUser", async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const chatroom = await Chatroom.findById(id);

        if (!chatroom) {
            return res.status(404).json({ error: "Chatroom not found" });
        }

        if (!chatroom.users.includes(userId)) {
            chatroom.users.push(userId);
            await chatroom.save();

            // Join message
            const message = new Message({
                content: "Joined the chat",
                sender: userId,
                chatroom: chatroom._id,
            });
            await message.save();
        }

        res.status(200).json(chatroom);
    } catch (error) {
        console.error("Error adding user to chatroom:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete('/api/chatrooms/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the chatroom
        const chatroom = await Chatroom.findById(id);
        if (!chatroom) {
            return res.status(404).json({ error: 'Chatroom not found' });
        }

        // Delete all messages associated with the chatroom
        await Message.deleteMany({ chatroom: id });

        // Delete the chatroom
        await Chatroom.findByIdAndDelete(id);

        res.status(200).json({ message: 'Chatroom and all associated messages deleted successfully' });
    } catch (error) {
        console.error('Error deleting chatroom and messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const server = app.listen(PORT);
console.log(`Server running at http://localhost:${PORT}/`);

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});
