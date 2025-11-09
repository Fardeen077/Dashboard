import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice"
import taskReducer from "../redux/slices/tasksSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: taskReducer
    },
});