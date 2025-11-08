import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Profile } from "../models/userProfileModel.js";

// create or update user profile
const upsertProfile = asyncHandler(async (req, res, next) => {
    const { bio, profileImage, phone, address } = req.body;
    let profile = await Profile.findOne({ userId: req.user.id });
    if (profile) {
        // update existing profile
        profile.bio = bio || profile.bio;
        profile.profileImage = profileImage || profile.profileImage;
        profile.phone = phone || profile.phone;
        profile.address = address || profile.address;
        await profile.save();
    } else {
        // craete profile
        profile = await Profile.create({
            userId: req.user.id,
            bio,
            profileImage,
            phone,
            address
        });
    }
    return res.status(200)
        .json(new ApiResponse(200, profile, "profile created successfully"))
})

const getProfile = asyncHandler(async (req, res, next) => {
    const {userId} =  req.params;
    const profile = await Profile.findOne({ userId: req.user.id })
        .populate("userId", "username email");

    if (!profile) {
        return next(new ApiError(404, "Profile not found"));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, profile, "Profile fetched successfully"));
});


export {
    getProfile,
    upsertProfile
}
