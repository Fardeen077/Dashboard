import { User } from "../models/userModel";
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"

// ✅ Middleware to verify JWT token (used for protected routes)

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Get token from cookies OR from Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "").trim();
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?.id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "invalid Access Token")
        }
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
})