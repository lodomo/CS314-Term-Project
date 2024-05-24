const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

const mongoose = require("mongoose");
const User = require("./models/User");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const CLIENT_URL = process.env.CLIENT_URL;

mongoose.connect(MONGO_URI);

// Use CORS middleware to allow requests from http://localhost:5173
app.use(
    cors({
        origin: CLIENT_URL,
    }),
);

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

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
});

app.listen(4000);
