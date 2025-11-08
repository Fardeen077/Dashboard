import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to User model
            required: true,
        },
        bio: {
            type: String,
            default: "",
        },
        profileImage: {
            type: String,
            default: "",
        },
        phone: {
            type: String,
            default: "",
        },
        address: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt automatically
    }
);

export const Profile = mongoose.model("Profile", profileSchema);


