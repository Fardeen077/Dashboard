import { axiosInstance } from "./axiosInstance";

const getProfile = async () => {
    const response = await axiosInstance.get("/profile");
    return response.data;
};

const updateProfile = async (userUpdatedData) => {
    const response = await axiosInstance.post("/profile", userUpdatedData);
    return response.data;
};

export {
    getProfile,
    updateProfile
}