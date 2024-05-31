const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    content: String,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chatroom",
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
