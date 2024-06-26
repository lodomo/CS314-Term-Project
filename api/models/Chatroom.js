const mongoose = require("mongoose");

const ChatroomSchema = new mongoose.Schema({
    name: String,
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
    ],
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Chatroom = mongoose.model("Chatroom", ChatroomSchema);

module.exports = Chatroom;
