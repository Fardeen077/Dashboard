import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StateCard from "../components/Dashboard/StatsCard";
import Button from "../components/Common/Button";
import { setUser } from "../redux/slices/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const navigate = useNavigate();
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserState(parsedUser);
      dispatch(setUser(parsedUser));
      setLoading(false);
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (tasks.length > 0) setLoading(false);
  }, [tasks]);

  console.log("Tasks:", tasks);
  console.log("User:", user);

  if (loading) return <p className="text-center mt-6">Loading user data...</p>;

  return (
    <div className="p-4 px-18">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome, {user?.name || "User"} 👋
        </h1>
        <p className="text-gray-600">
          Here’s an overview of your current tasks and activity.
        </p>
      </div>

      {/* ✅ Actions */}
      <div className="flex items-center gap-3 mt-4">
        <Button text="Create Task" onClick={() => navigate("/task")} />
        <Button
          text="Logout"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }}
        />
      </div>

      {/* ✅ Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <StateCard
              key={task._id}
              title={task.title}
              description={task.description}
              status={task.status}
              priority={task.priority}
              dueDate={task.dueDate}
              task={task.task}
            />
          ))
        ) : (
          <p className="text-gray-500 mt-4">No tasks available. Create one!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
