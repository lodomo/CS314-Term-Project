require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const app = express();
const port = 5000;

// Schemas
const Chatroom = require('./models/chatroom.js');
const Message = require('./models/message.js');
const RelUserChatroom = require('./models/reluserchatroom.js');
const User = require('./models/user.js');

// Middleware to parse JSON
app.use(express.json());

// Create a single MongoDB connection when the app starts
const client = new MongoClient(process.env.MONGO_URI);
let db;

// Create a Mongoose connection when the app starts
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected correctly to MongoDB using Mongoose");
    })
    .catch((err) => console.error("Failed to connect to MongoDB", err));

client
    .connect()
    .then(() => {
        db = client.db("chatdb"); // Access the database
        console.log("Connected correctly to server");
    })
    .catch((err) => console.error("Failed to connect to MongoDB", err));

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Serve the homepage
app.get("/", (req, res) => {
    res.send("Welcome to the backend server for CS-314 Chat!\n If you're looking for the front end, it's at https://localhost:3000/");
});

// Test endpoint for Chatroom
app.post("/testChatroom", async (req, res) => {
    try {
        const newChatroom = new Chatroom({
            roomID: 0,
            roomName: "TEST ROOM",
            roomOwner: "TEST OWNER"
        });
        await newChatroom.save();
        res.status(201).send("Chatroom created successfully!");
    } catch (error) {
        res.status(500).send("Error creating chatroom: " + error.message);
    }
});

// Test endpoint for Message
app.post("/testMessage", async (req, res) => {
    try {
        const newMessage = new Message({
            userID: 0, 
            message: "TEST MESSAGE",
            roomID: 0
        });
        await newMessage.save();
        res.status(201).send("Message sent successfully!");
    } catch (error) {
        res.status(500).send("Error sending message: " + error.message);
    }
});

// Test endpoint for RelUserChatroom
app.post("/testRelUserChatroom", async (req, res) => {
    try {
        const newRel = new RelUserChatroom({
            userToken: 0, 
            chatroomId: 0
        });
        await newRel.save();
        res.status(201).send("Relationship created successfully!");
    } catch (error) {
        res.status(500).send("Error creating relationship: " + error.message);
    }
});

// Test endpoint for User
app.post("/testUser", async (req, res) => {
    try {
        const newUser = new User({
            userToken: 1, 
            username: "TEST USER",
        });
        await newUser.save();
        res.status(201).send("User created successfully!");
    } catch (error) {
        res.status(500).send("Error creating user: " + error.message);
    }
});
