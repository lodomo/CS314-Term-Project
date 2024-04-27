require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());

// Create a single MongoDB connection when the app starts
const client = new MongoClient(process.env.MONGO_URI);
let db;

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
    res.send("Hello World!");
});
