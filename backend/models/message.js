// Message Schema 
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    roomID: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
