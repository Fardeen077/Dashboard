import React from "react";
import TaskForm from "../components/Dashboard/TaskForm";

const Task = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
      <TaskForm />
    </div>
  );
};

export default Task;
