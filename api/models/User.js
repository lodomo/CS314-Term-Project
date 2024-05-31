const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    picture: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
