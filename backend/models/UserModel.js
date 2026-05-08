const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    role: { type: String, default: "user" },

    wallet: { type: Number, default: 0 },

    history: [
        {
            type: Object,
            default: []
        }
    ]
});

module.exports = mongoose.model("User", userSchema);