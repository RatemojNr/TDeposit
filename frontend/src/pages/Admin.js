import { useEffect, useState } from "react";
import API from "../api";

function Admin() {
    const [users, setUsers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);

    const token = localStorage.getItem("token");

    const headers = {
        Authorization: `Bearer ${token}`
    };

    // ======================
    // LOAD DATA
    // ======================
    async function loadData() {
        try {
            const usersRes = await API.get("/admin/analytics/users", { headers });
            const txRes = await API.get("/admin/analytics/transactions", { headers });
            const wdRes = await API.get("/admin/analytics/withdrawals", { headers });

            setUsers(usersRes.data.users || []);
            setTransactions(txRes.data.transactions || []);
            setWithdrawals(wdRes.data || []);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    // ======================
    // APPROVE WITHDRAWAL
    // ======================
    async function approve(id) {
        await API.post("/admin/analytics/withdraw/approve", { id }, { headers });
        loadData();
    }

    // ======================
    // REJECT WITHDRAWAL
    // ======================
    async function reject(id) {
        await API.post("/admin/analytics/withdraw/reject", { id }, { headers });
        loadData();
    }

    return (
        <div style={styles.container}>
            <h1>Admin Dashboard</h1>

            {/* USERS */}
            <h2>Users</h2>
            {users.map((u, i) => (
                <div key={i} style={styles.card}>
                    <p>Username: {u.username}</p>
                    <p>Wallet: ${u.wallet}</p>
                </div>
            ))}

            {/* TRANSACTIONS */}
            <h2>Transactions</h2>
            {transactions.map((t, i) => (
                <div key={i} style={styles.card}>
                    <p>{t.username}</p>
                    <p>{t.type}</p>
                    <p>${t.amount}</p>
                </div>
            ))}

            {/* WITHDRAWALS */}
            <h2>Withdrawals</h2>
            {withdrawals.map((w, i) => (
                <div key={i} style={styles.card}>
                    <p>{w.username}</p>
                    <p>${w.amount}</p>
                    <p>Status: {w.status}</p>

                    <button
                        style={styles.approve}
                        onClick={() => approve(w._id)}
                    >
                        Approve
                    </button>

                    <button
                        style={styles.reject}
                        onClick={() => reject(w._id)}
                    >
                        Reject
                    </button>
                </div>
            ))}
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        backgroundColor: "#0f0f0f",
        color: "white",
        minHeight: "100vh"
    },
    card: {
        backgroundColor: "#1c1c1c",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "8px"
    },
    approve: {
        marginRight: "10px",
        backgroundColor: "green",
        color: "white",
        padding: "5px"
    },
    reject: {
        backgroundColor: "red",
        color: "white",
        padding: "5px"
    }
};

export default Admin;