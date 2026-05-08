const mongoose = require("mongoose");

const withdrawalSchema = new mongoose.Schema({
    username: String,
    amount: Number,
    status: {
        type: String,
        default: "pending"
    },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Withdrawal", withdrawalSchema);