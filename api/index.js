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

    // Make sure the user is added to the main chatroom
    try {
        let user = await User.findOne({ email });
        const mainChatroom = await Chatroom.findOne({ name: "main" });
        if (!mainChatroom.users.includes(user._id)) {
            mainChatroom.users.push(user._id);
            await mainChatroom.save();
        }
    } catch (error) {
        console.error("Error adding user to main chatroom:", error);
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

const server = app.listen(PORT);
console.log(`Server running at http://localhost:${PORT}/`);

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});
