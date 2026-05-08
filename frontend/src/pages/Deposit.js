import { useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";

function Deposit() {
    const [amount, setAmount] = useState("");
    const username = localStorage.getItem("username");

    async function deposit() {
        const res = await API.post("/wallet/deposit", {
            username,
            amount: Number(amount)
        });

        alert(res.data.message);
    }

    return (
        <div style={styles.container}>
            <Sidebar />

            <div style={styles.main}>
                <h1>Deposit</h1>

                <input
                    style={styles.input}
                    placeholder="Enter amount"
                    onChange={(e) => setAmount(e.target.value)}
                />

                <button style={styles.button} onClick={deposit}>
                    Deposit
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        backgroundColor: "#0f0f0f",
        color: "white",
        minHeight: "100vh"
    },
    main: {
        marginLeft: "220px",
        padding: "20px"
    },
    input: {
        padding: "10px",
        width: "200px",
        marginRight: "10px"
    },
    button: {
        padding: "10px",
        backgroundColor: "green",
        color: "white",
        border: "none"
    }
};

export default Deposit;