const WebSocket = require("ws");

let ws;
let latestBalance = 0;

function connectBalanceSync() {
    ws = new WebSocket("wss://ws.derivws.com/websockets/v3?app_id=1089");

    ws.on("open", () => {
        console.log("Balance sync engine started ✅");

        // authenticate
        ws.send(JSON.stringify({
            authorize: process.env.DERIV_API_TOKEN
        }));
    });

    ws.on("message", (data) => {
        const res = JSON.parse(data);

        // When authenticated, request balance
        if (res.msg_type === "authorize") {
            ws.send(JSON.stringify({
                balance: 1,
                subscribe: 1
            }));
        }

        // live balance updates
        if (res.msg_type === "balance") {
            latestBalance = res.balance.balance;

            console.log("LIVE DERIV BALANCE:", latestBalance);
        }
    });

    ws.on("error", (err) => {
        console.log("Balance sync error:", err.message);
    });
}

function getLatestBalance() {
    return latestBalance;
}

module.exports = {
    connectBalanceSync,
    getLatestBalance
};