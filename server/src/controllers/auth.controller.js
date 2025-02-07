import ApiError from "../lib/ApiError.js";
import ApiResponse from "../lib/ApiResponse.js";
import asyncHandler from "../lib/asyncHandler.js";
import { generateToken, loggedUser } from "../lib/Tokens.js";
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
  const token = await generateToken(createdUser._id);
  return res
    .status(200)
    .cookie("auth", token, {
      httpOnly: true,
      secure: false,
      sameSite: true,
    })
    .json(new ApiResponse(200, token));
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
  const user = loggedUser(req.cookies.auth);
  return res.status(200).clearCookie("auth").json(new ApiResponse(200, user));
});
