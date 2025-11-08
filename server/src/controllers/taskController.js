import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Task } from "../models/taskModel.js"

const createTask = asyncHandler(async (req, res, next) => {
    const { title, description, status, priority, dueDate } = req.body;
    if (!title || !description) {
        throw new ApiError(400, "Title or description is required");
    }

    const newTask = await Task.create({
        title,
        description,
        status,
        priority,
        dueDate,
        userId: req.user._id
    });

    const response = new ApiResponse(201, newTask, "task created successfully");
    return res.status(response.statusCode).json(response);
});

const updateTask = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, description, status, dueDate, priority } = req.body;

    const task = await Task.findById(id)
    if (!task) {
        throw new ApiError(400, "task is not found");
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (dueDate) task.dueDate = dueDate;

    const updatedTask = await task.save();

    const response = new ApiResponse(200, updatedTask, "Task updated successfully");
    return res.status(response.statusCode).json(response);
});

const deleteTask = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
        throw new ApiError(400, "task not found");
    }

    const response = new ApiResponse(201, deletedTask, "Task is deleted successfully");
    return res.status(response.statusCode).json(response);
});


const getAllTask = asyncHandler(async (req, res, next) => {
    const tasks = await Task.find();
    const response = new ApiResponse(201, tasks, "Tasks fetched successfully");
    return res.status(response.statusCode).json(response);
});

export {
    createTask,
    updateTask,
    deleteTask,
    getAllTask
};