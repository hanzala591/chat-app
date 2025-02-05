import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const generateToken = async (id) => {
  try {
    const user = await User.findById(id).select("-password");
    return jwt.sign(user, process.env.JSON_PRIVATE_KEY);
  } catch (error) {
    return error;
  }
};
