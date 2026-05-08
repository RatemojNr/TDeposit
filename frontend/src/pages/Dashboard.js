import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";

function Dashboard() {
    const [wallet, setWallet] = useState(0);
    const [history, setHistory] = useState([]);

    const username = localStorage.getItem("username");

    async function load() {
        const res = await API.post("/wallet/balance", { username });

        setWallet(res.data.wallet);
        setHistory(res.data.history);
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <div style={styles.container}>

            <Sidebar />

            <div style={styles.main}>

                <h1>Dashboard</h1>

                <div style={styles.card}>
                    <h2>Wallet Balance</h2>
                    <h1>${wallet}</h1>
                </div>

                <h3>Transactions</h3>

                {history.map((h, i) => (
                    <div key={i} style={styles.tx}>
                        <p>{h.type}</p>
                        <p>${h.amount}</p>
                    </div>
                ))}

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
        padding: "20px",
        width: "100%"
    },
    card: {
        backgroundColor: "#1c1c1c",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px"
    },
    tx: {
        backgroundColor: "#222",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px"
    }
};

export default Dashboard;