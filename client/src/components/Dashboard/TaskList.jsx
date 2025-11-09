import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTask, updateTask } from "../../redux/slices/tasksSlice";

const TaskList = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    // call API to delete
    dispatch(removeTask(id));
  };

  const handleUpdate = (task) => {
    // open modal or redirect to TaskForm with prefilled data
    dispatch(updateTask(task));
  };

  return (
    <div className="grid gap-2">
      {tasks.map(task => (
        <div key={task._id} className="border p-2 rounded flex justify-between">
          <div>
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleUpdate(task)} className="bg-yellow-500 px-2 rounded">Edit</button>
            <button onClick={() => handleDelete(task._id)} className="bg-red-500 px-2 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
