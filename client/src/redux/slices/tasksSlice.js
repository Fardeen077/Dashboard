import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: []
};

const taskSlice = createSlice({
    name: "Tasks",
    initialState,
    reducers: {
        createTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        updateTask: (state, action) => {
            state.tasks = state.tasks.map((task) => task.id === action.payload.id ? action.payload : task);
        },
        setTasks: (state, action) => {
            state.tasks = action.payload;
        }
    }
});

export const {
    createTask,
    removeTask,
    updateTask,
    setTasks,
} = taskSlice.actions;

export default taskSlice.reducer;

