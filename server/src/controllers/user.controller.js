import ApiResponse from "../lib/ApiResponse.js";
import asyncHandler from "../lib/asyncHandler.js";
import User from "../models/user.model.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const loggedUser = req?.user;
  const users = await User.find({ email: { $ne: loggedUser?.email } }).select(
    "-password"
  );
  return res.status(200).json(new ApiResponse(200, users));
});
