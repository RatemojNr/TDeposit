const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema({
    username: String,
    type: String, // deposit, withdrawal
    amount: Number,
    commission: Number,
    netAmount: Number,
    status: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ledger", ledgerSchema);