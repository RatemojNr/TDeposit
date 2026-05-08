const User = require("../models/UserModel");
const Ledger = require("../models/LedgerModel");
const Withdrawal = require("../models/WithdrawalModel");

// ======================
// ALL TRANSACTIONS
// ======================
async function getAllTransactions(req, res) {
    try {
        const transactions = await Ledger.find().sort({ date: -1 });

        res.json({
            total: transactions.length,
            transactions
        });

    } catch (err) {
        res.json({
            message: "Failed to fetch transactions",
            error: err.message
        });
    }
}

// ======================
// ALL USERS
// ======================
async function getAllUsers(req, res) {
    try {
        const users = await User.find();

        res.json({
            total: users.length,
            users
        });

    } catch (err) {
        res.json({
            message: "Failed to fetch users",
            error: err.message
        });
    }
}

// ======================
// ALL WITHDRAWALS
// ======================
async function getAllWithdrawals(req, res) {
    try {
        const withdrawals = await Withdrawal.find().sort({ date: -1 });

        res.json(withdrawals);

    } catch (err) {
        res.json({
            message: "Failed to fetch withdrawals",
            error: err.message
        });
    }
}

// ======================
// APPROVE WITHDRAWAL
// ======================
async function approveWithdrawal(req, res) {
    try {
        const { id } = req.body;

        const withdrawal = await Withdrawal.findById(id);

        if (!withdrawal) {
            return res.json({ message: "Withdrawal not found" });
        }

        withdrawal.status = "approved";

        await withdrawal.save();

        res.json({
            message: "Withdrawal approved",
            withdrawal
        });

    } catch (err) {
        res.json({
            message: "Approval failed",
            error: err.message
        });
    }
}

// ======================
// REJECT WITHDRAWAL
// ======================
async function rejectWithdrawal(req, res) {
    try {
        const { id } = req.body;

        const withdrawal = await Withdrawal.findById(id);

        if (!withdrawal) {
            return res.json({ message: "Withdrawal not found" });
        }

        const user = await User.findOne({
            username: withdrawal.username
        });

        // refund user
        if (user) {
            user.wallet += withdrawal.amount;

            user.history.push({
                type: "refund",
                amount: withdrawal.amount,
                note: "Rejected withdrawal refund",
                date: new Date()
            });

            await user.save();
        }

        withdrawal.status = "rejected";

        await withdrawal.save();

        res.json({
            message: "Withdrawal rejected & refunded",
            withdrawal
        });

    } catch (err) {
        res.json({
            message: "Rejection failed",
            error: err.message
        });
    }
}

// ======================
// EXPORTS
// ======================
module.exports = {
    getAllTransactions,
    getAllUsers,
    getAllWithdrawals,
    approveWithdrawal,
    rejectWithdrawal
};