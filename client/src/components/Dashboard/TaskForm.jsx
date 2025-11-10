import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../redux/slices/tasksSlice";
import { createTaskApi } from "../../api/tasksApi";
import { useNavigate } from "react-router-dom";

const TaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (redirect) navigate("/");
  }, [redirect, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      status,
      priority,
      dueDate: dueDate || new Date().toISOString(),
    };
    console.log("[TaskForm] submit payload:", newTask);

    try {
      const createdTask = await createTaskApi(newTask);
      console.log("Created Task:", createdTask); // debug
      dispatch(createTask(createdTask.data || createdTask)); // adjust according to backend response
      setRedirect(true);
      setTitle("");
      setDescription("");
      setStatus("pending");
      setPriority("medium");
      setDueDate("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4 max-w-md">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => { setTitle(e.target.value); console.log('[TaskForm] title change:', e.target.value); }}
        className="border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => { setDescription(e.target.value); console.log('[TaskForm] description change:', e.target.value); }}
        className="border p-2 rounded"
        required
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 rounded"
        required
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border p-2 rounded"
      />

      <button
        type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
