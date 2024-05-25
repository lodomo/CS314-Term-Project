const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chatroom",
    },
    content: String,
});

const Message = mongoose.model("Message", MessageSchema);
