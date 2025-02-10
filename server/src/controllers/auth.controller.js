import ApiError from "../lib/ApiError.js";
import ApiResponse from "../lib/ApiResponse.js";
import asyncHandler from "../lib/asyncHandler.js";
import { uploadFileOnCloudinary } from "../lib/cloudinary.js";
import { generateToken } from "../lib/Tokens.js";
import fs from "fs";
import { upload } from "../middlewares/multer.middleware.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = asyncHandler(async (req, res) => {
  try {
    const { email, fullName, password } = req.body;
    if ([email, fullName, password].every((v, i) => v.length !== 0)) {
    } else {
      throw new ApiError(400, "One Field is Empty");
    }
    const findUser = await User.findOne({ email });
    if (findUser) {
      throw new ApiError(400, "User is Already Existed");
    }
    const cryptedPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.SALT)
    );
    const uploadedCloudinary = await uploadFileOnCloudinary(req.file.path);
    if (!uploadedCloudinary) {
      throw new ApiError(400, "Image is not uploaded on Cloudinary");
    }
    const user = await User.create({
      email,
      fullName,
      password: cryptedPassword,
      profilePic: uploadedCloudinary.secure_url,
    });
    if (!user) {
      throw new ApiError(500, "User is not Created In DB");
    }
    const createdUser = await User.findOne({ email }).select("-password");
    const token = await generateToken(createdUser._id);
    fs.unlinkSync(req.file.path);
    return res
      .status(200)
      .cookie("auth", token, {
        httpOnly: true,
        secure: false,
        sameSite: true,
      })
      .json(new ApiResponse(200, token));
  } catch (error) {
    fs.unlinkSync(req.file.path);
    throw new ApiError(400, error);
  }
});
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].every((v, i) => v.length !== 0)) {
  } else {
    throw new ApiError(400, "Email or Password is Empty");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Please Registered First.");
  }
  const cryptedPassword = await bcrypt.compare(password, user.password);
  if (!cryptedPassword) {
    throw new ApiError(400, "Password is Wrong");
  }
  const token = await generateToken(user._id);
  return res
    .status(200)
    .cookie("auth", token, {
      httpOnly: true,
      secure: false,
      sameSite: true,
    })
    .json(new ApiResponse(200, token));
});
export const logout = asyncHandler((req, res) => {
  return res
    .status(200)
    .clearCookie("auth")
    .json(new ApiResponse(200, req.user));
});

export const updateProfilePic = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const uploadedCloudinary = await uploadFileOnCloudinary(req.file.path);
    if (!uploadedCloudinary) {
      throw new ApiError(500, "Image is not Uploaded");
    }
    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      {
        $set: {
          profilePic: uploadedCloudinary.secure_url,
        },
      },
      { new: true }
    ).select("-password");
    fs.unlinkSync(req.file.path);
    return res.status(200).json(new ApiResponse(200, updatedUser));
  } catch (error) {
    fs.unlinkSync(req.file.path);
  }
});

export const updatePassword = asyncHandler((req, res) => {});
