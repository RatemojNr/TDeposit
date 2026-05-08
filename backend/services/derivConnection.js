const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const WebSocket = require("ws");

const DERIV_WS = "wss://ws.derivws.com/websockets/v3?app_id=1089";

let ws;

function connectDeriv() {
    ws = new WebSocket(DERIV_WS);

    ws.on("open", () => {
        console.log("Connected to Deriv ✅");

        const token = process.env.DERIV_API_TOKEN;

        console.log("TOKEN LOADED:", token);

        ws.send(JSON.stringify({
            authorize: token
        }));
    });

    ws.on("message", (data) => {
        console.log("Deriv Response:", data.toString());
    });

    ws.on("close", () => {
        console.log("Deriv connection closed ❌");
    });

    ws.on("error", (err) => {
        console.log("Deriv error:", err.message);
    });
}

module.exports = { connectDeriv };