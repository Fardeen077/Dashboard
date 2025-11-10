import React from "react";
import TaskForm from "../components/Dashboard/TaskForm";

const Task = () => {
  return (
    <div className="p-4bg-gray-50 mx-auto text-center w-full max-w-md mt-24 p-5">
      <h1 className="text-2xl font-bold mb-4 justify-center items-center">Create New Task</h1>
      <TaskForm />
    </div>
  );
};

export default Task;
