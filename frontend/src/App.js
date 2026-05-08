import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Admin from "./pages/Admin";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* AUTH */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* USER DASHBOARD */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/deposit" element={<Deposit />} />
                <Route path="/withdraw" element={<Withdraw />} />

                {/* ADMIN */}
                <Route path="/admin" element={<Admin />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;