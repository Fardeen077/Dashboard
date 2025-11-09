import { axiosInstance } from "./axiosInstance"; // apna axios instance import karo

// Create new task
const createTaskApi = async (taskData) => {
    const response = await axiosInstance.post("/task", taskData);
    return response.data;
};

// Update existing task
const updateTaskApi = async (id, taskData) => {
    const response = await axiosInstance.put(`/task/${id}`, taskData);
    return response.data;
};

// Delete task
const deleteTaskApi = async (id) => {
    const response = await axiosInstance.delete(`/task/${id}`);
    return response.data;
};

// Get all tasks
const getTasksApi = async () => {
    const response = await axiosInstance.get("/task");
    return response.data;
};

export {
    createTaskApi,
    updateTaskApi,
    deleteTaskApi,
    getTasksApi
};
