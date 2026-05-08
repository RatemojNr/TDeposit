const express = require("express");
const router = express.Router();

const { authMiddleware } = require("./middleware/authMiddleware");

const {
    deposit,
    balance,
    sync,
    withdraw
} = require("./controllers/walletController");

// ======================
// USER PROTECTED ROUTES
// ======================
router.post("/deposit", authMiddleware, deposit);
router.post("/balance", authMiddleware, balance);
router.post("/sync", authMiddleware, sync);
router.post("/withdraw", authMiddleware, withdraw);

module.exports = router;