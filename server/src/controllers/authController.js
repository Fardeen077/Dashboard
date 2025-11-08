import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new ApiError(404, "User not found");

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(400, "Error generating token")
    }
};

const registerUser = asyncHandler(async (req, res) => {
    console.log("Incoming data:", req.body); //
    const { email, username, password } = req.body;
    // console.log(req.body);
    
    if ([email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields cannot be empty");
    }
    const existsUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existsUser) {
        throw new ApiError(400, "User is already exists");
    };

    const user = await User.create({
        username: username?.toLowerCase() || "",
        email: email?.toLowerCase() || "",
        password,
        avatar: "https://images6.alphacoders.com/125/thumbbig-1258531.webp", // default image
    });

    const tokens = await generateAccessTokenAndRefreshToken(user._id);
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Error creating user !!!");
    }
    return res.status(201).json(new ApiResponse(201,{ user: createdUser, ...tokens },"User created",));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    if (!email && !username) {
        throw new ApiError(400, "Email and userusername are required");
    };
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
        throw new ApiError(404, "User is not found");
    };
    const isPasswordVali = await user.isPasswordCorrect(password)
    if (!isPasswordVali) {
        throw new ApiError(400, "Invalid password");
    };
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    }
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {
            user: await User.findById(user._id).select("-password -refreshToken"),
            accessToken,
            refreshToken
        }, "User logged successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
    // clear cookies
    await User.findByIdAndUpdate(req.user._id, {
        $unset: { refreshToken: 1 },
    });
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    }
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"))
});

export {
    generateAccessTokenAndRefreshToken,
    registerUser,
    loginUser,
    logoutUser,
};