import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div style={styles.sidebar}>

            <h2 style={{ color: "white" }}>TDeposit</h2>

            <Link style={styles.link} to="/dashboard">Dashboard</Link>
            <Link style={styles.link} to="/deposit">Deposit</Link>
            <Link style={styles.link} to="/withdraw">Withdraw</Link>
            <Link style={styles.link} to="/">Logout</Link>
            <Link style={styles.link} to="/admin">Admin</Link>

        </div>
    );
}

const styles = {
    sidebar: {
        width: "200px",
        height: "100vh",
        backgroundColor: "#111",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: 0
    },
    link: {
        display: "block",
        color: "white",
        marginTop: "20px",
        textDecoration: "none"
    }
};

export default Sidebar;