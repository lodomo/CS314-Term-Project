const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

const mongoose = require("mongoose");
const User = require("./models/User");
const Chatroom = require("./models/Chatroom");

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
    const mainChatroom = await Chatroom.findOne({ name: 'main' });
    if (!mainChatroom) {
      const newChatroom = new Chatroom({ name: 'main', users: [], admin: null, messages: [] });
      await newChatroom.save();
      console.log('Main chatroom created');
    } else {
      console.log('Loading Main chatroom');
    }
  } catch (error) {
    console.error('Error ensuring main chatroom exists:', error);
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
            user: { name, email, picture },
        });
    } catch (error) {
        console.error("Error processing user data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

    // Make sure the user is added to the main chatroom
    try {
        let user = await User.findOne({ email });
        const mainChatroom = await Chatroom.findOne({ name: 'main' });
        if (!mainChatroom.users.includes(user._id)) {
            mainChatroom.users.push(user._id);
            await mainChatroom.save();
        }
    } catch (error) {
        console.error('Error adding user to main chatroom:', error);
    }
});

app.listen(PORT);

// Print the address of the server to the terminal
console.log(`Server running at http://localhost:${PORT}/`);
