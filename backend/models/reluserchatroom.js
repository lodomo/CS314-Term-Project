// RelUserChatroom Schema
const mongoose = require("mongoose");

const relUserChatroomSchema = new mongoose.Schema({
    userToken: {
        type: String,
        required: true,
    },
    chatroomId: {
        type: Number,
        required: true,
    },
});

const RelUserChatroom = mongoose.model("RelUserChatroom", relUserChatroomSchema);
module.exports = RelUserChatroom;

