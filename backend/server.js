const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// ROUTES
// ======================
const authRoutes = require("./authRoutes");
const walletRoutes = require("./walletRoutes");
const analyticsRoutes = require("./analyticsRoutes");

// ======================
// ROUTE MOUNTS
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/admin/analytics", analyticsRoutes);

// ======================
// SERVICES (DERIV + SYNC)
// ======================
const { connectDerivSocket } = require("./services/derivService");
const { connectBalanceSync } = require("./services/balanceService");
const { connectDeriv } = require("./services/derivConnection");

// start services safely
connectDerivSocket();
connectBalanceSync();
connectDeriv();

// ======================
// HOME ROUTE
// ======================
app.get("/", (req, res) => {
    res.send("TDeposit running 🚀");
});

// ======================
// START SERVER
// ======================
app.listen(PORT, () => {
    console.log("TDeposit backend running on port", PORT);
});