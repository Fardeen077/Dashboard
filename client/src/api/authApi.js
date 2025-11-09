import { axiosInstance } from "./axiosInstance";

const register = async (userData) => {
    const response = await axiosInstance.post("/register", userData);
    return response.data;
};

const login = async (userData) => {
    const response = await axiosInstance.post("/login", userData);
    return response.data;
};

const logout = async () => {
    const response = await axiosInstance.post("/logout");
    return response.data;
};

export {
    register,
    login,
    logout
}