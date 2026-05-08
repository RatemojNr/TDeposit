const express = require("express");
const router = express.Router();

const {
    authMiddleware,
    adminOnly
} = require("./middleware/authMiddleware");

const {
    getAllTransactions,
    getAllUsers,
    getAllWithdrawals,
    approveWithdrawal,
    rejectWithdrawal
} = require("./controllers/adminController");

// ======================
// ADMIN ONLY ACCESS
// ======================

// USERS + TRANSACTIONS
router.get("/transactions", authMiddleware, adminOnly, getAllTransactions);
router.get("/users", authMiddleware, adminOnly, getAllUsers);

// WITHDRAWALS
router.get("/withdrawals", authMiddleware, adminOnly, getAllWithdrawals);
router.post("/withdraw/approve", authMiddleware, adminOnly, approveWithdrawal);
router.post("/withdraw/reject", authMiddleware, adminOnly, rejectWithdrawal);

module.exports = router;