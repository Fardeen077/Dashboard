import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Task from "./pages/Task";
import Navbar from "./components/Layout/Navbar";
import Profile from "./pages/Profile";

function App() {
  const user = useSelector(state => state.auth.user); // get logged-in user from Redux

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Private Route */}
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/task" element={user ? <Task /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
