// User Schema
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userToken: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
