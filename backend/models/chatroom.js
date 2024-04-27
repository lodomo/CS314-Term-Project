// Chatroom Schema
const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
    roomID: {
        type: Number,
        required: true,
    },
    roomName: {
        type: String,
        required: true,
    },
    roomOwner: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Chatroom = mongoose.model("Chatroom", chatroomSchema);
module.exports = Chatroom;
