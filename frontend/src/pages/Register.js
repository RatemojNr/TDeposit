import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister() {
        try {
            const res = await API.post("/auth/register", {
                username,
                password
            });

            alert(res.data.message);

            navigate("/");

        } catch (err) {
            alert("Registration failed");
        }
    }

    return (
        <div>
            <h1>Register</h1>

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

            <button onClick={handleRegister}>
                Register
            </button>
        </div>
    );
}

export default Register;