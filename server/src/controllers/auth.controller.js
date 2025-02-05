import ApiError from "../lib/ApiError.js";
import asyncHandler from "../lib/asyncHandler.js";
import { generateToken } from "../lib/Tokens.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = asyncHandler(async (req, res) => {
  const { email, fullName, password } = req.body;

  if ([email, fullName, password].every((v, i) => v.length !== 0)) {
  } else {
    console.log("One Field is empty");
    throw new ApiError(400, "One Field is Empty");
  }
  const findUser = await User.findOne({ email });
  if (findUser) {
    throw new ApiError(400, "User is Already Existed");
  }
  const cryptedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT));
  console.log(cryptedPassword);
  await User.create({
    email,
    fullName,
    password: cryptedPassword,
  });
  const createdUser = await User.findOne({ email }).select("-password");
  generateToken(createdUser._id);
  return res.json(createdUser);
});
export const login = (req, res) => {};
export const logout = (req, res) => {};
