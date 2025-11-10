import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StateCard from "../components/Dashboard/StatsCard";
import Button from "../components/Common/Button";
import { login, } from "../redux/slices/authSlice";
import { setTasks } from "../redux/slices/tasksSlice";
import { getTasksApi } from "../api/tasksApi";

const Home = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        console.log("Checking auth before route...");
        console.log("Redux user:", user);
        console.log("LocalStorage token:", localStorage.getItem("token"));

        if (token && storedUser) {
          const parsedUser = JSON.parse(storedUser);
          dispatch(login({ user: parsedUser, token }));
          console.log(user);
        } else {
          navigate("/login")
        }
      } catch (error) {
        console.error("Auth verification failed:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [dispatch, navigate]);

  // Redirect to login if no user after restore
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Fetch tasks from server when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (user) {
          const data = await getTasksApi();
          console.log("Fetched tasks:", data);
          // Handle response structure from backend
          dispatch(setTasks(data.data || data)); // adjust based on your API response
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, [user, dispatch]);

  console.log("Tasks:", tasks);
  console.log("User:", user);

  if (loading) return <p className="text-center mt-6">Loading user data...</p>;

  return (
    <div className="p-4 px-18">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome, {user.username || "user"} 👋
        </h1>
        <p className="text-gray-600">
          Here’s an overview of your current tasks and activity.
        </p>
      </div>

      {/* ✅ Actions */}
      <div className="flex items-center gap-3 mt-4">
        <Button text="Create Task" onClick={() => navigate("/task")} />
      </div>

      {/* ✅ Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <StateCard
              key={task._id}
              task={task}
              title={task.title}
              description={task.description}
              status={task.status}
              priority={task.priority}
              dueDate={task.dueDate}
            />

          ))
        ) : (
          <p className="text-gray-500 mt-4 ">No tasks available. Create one!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
