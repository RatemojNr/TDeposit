import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        try {
            const res = await API.post("/auth/login", {
                username,
                password
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", username);

            alert("Login successful");

            navigate("/dashboard");

        } catch (err) {
            alert("Login failed");
        }
    }

    return (
        <div>
            <h1>TDeposit Login</h1>

            <input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleLogin}>
                Login
            </button>

            <br /><br />

            <Link to="/register">
                Create Account
            </Link>
        </div>
    );
}

export default Login;