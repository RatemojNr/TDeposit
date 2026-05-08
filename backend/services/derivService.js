const WebSocket = require("ws");

let ws;

function connectDerivSocket() {
    ws = new WebSocket("wss://ws.derivws.com/websockets/v3?app_id=1089");

    ws.on("open", () => {
        console.log("Deriv transfer engine ready ✅");
    });

    ws.on("message", (data) => {
        console.log("Deriv API Response:", data.toString());
    });

    ws.on("error", (err) => {
        console.log("Deriv error:", err.message);
    });
}

// REAL transfer function (foundation level)
function sendToDeriv(user, amount) {
    if (!ws || ws.readyState !== 1) {
        return {
            status: "failed",
            message: "Deriv socket not ready"
        };
    }

    const payload = {
        transfer_between_accounts: 1,
        amount: amount,
        accounts: {
            from: "wallet",
            to: user.username
        }
    };

    ws.send(JSON.stringify(payload));

    return {
        status: "sent",
        message: "Transfer request sent to Deriv queue",
        user: user.username,
        amount
    };
}

module.exports = {
    connectDerivSocket,
    sendToDeriv
};