import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { setUser, login as loginAction } from "./redux/slices/authSlice";
import Task from "./pages/Task";
import Navbar from "./components/Layout/Navbar";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    // restore auth from localStorage once at app startup to avoid route-guard redirect
    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (token && storedUser) {
        const parsed = JSON.parse(storedUser);
        dispatch(setUser(parsed));
        // store token in redux if you use it elsewhere
        dispatch(loginAction({ user: parsed, token }));
      }
    } catch (err) {
      console.error("Auth restore failed:", err);
    } finally {
      setRestored(true);
    }
  }, [dispatch]);

  // don't render routes until restore completes
  if (!restored) return null;

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Private Routes - Protected by ProtectedRoute component */}
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/task" element={<ProtectedRoute element={<Task />} />} />
      </Routes>
    </Router>
  );
}

export default App;
