import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTask, updateTask } from "../../redux/slices/tasksSlice";
import { deleteTaskApi, updateTaskApi } from "../../api/tasksApi";

const StateCard = ({ task }) => {
    const dispatch = useDispatch();

    // ✅ Use optional chaining + default values
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task?.status || "pending");
    const [priority, setPriority] = useState(task?.priority || "medium");
    const [dueDate, setDueDate] = useState(task?.dueDate || new Date().toISOString());

    const handleDelete = async () => {
        if (!task?._id) return;
        try {
            await deleteTaskApi(task._id);
            dispatch(removeTask(task._id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async () => {
        if (!task?._id) return;
        const updatedTask = { ...task, title, description, status, priority, dueDate };
        try {
            await updateTaskApi(task._id, updatedTask);
            dispatch(updateTask(updatedTask));
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        }
    };

    if (!task) {
        // ✅ Prevent rendering before data is ready
        return <p className="text-gray-500">Loading task...</p>;
    }

    return (
        <div className="border rounded p-4 shadow hover:shadow-lg transition">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-1 rounded w-full mb-2"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-1 rounded w-full mb-2"
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border p-1 rounded w-full mb-2"
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <input
                        type="text"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="border p-1 rounded w-full mb-2"
                    />
                    <input
                        type="date"
                        value={new Date(dueDate).toISOString().split("T")[0]}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="border p-1 rounded w-full mb-2"
                    />
                    <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <h2 className="text-xl font-bold mb-2">{title}</h2>
                    <p className="text-gray-700 mb-2">{description}</p>
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>Status: <strong>{status}</strong></span>
                        <span>Priority: <strong>{priority}</strong></span>
                        <span>Due: <strong>{new Date(dueDate).toLocaleDateString()}</strong></span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                            Update
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default StateCard;
