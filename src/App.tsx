import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Reservation from "./pages/Reservation/Reservation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Login />} />
                    <Route
                        path="/reservation"
                        element={<Reservation />}
                    ></Route>
                    <Route path="/admin" element={<Admin />}></Route>
                    <Route
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                    ></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
