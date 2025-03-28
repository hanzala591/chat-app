import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const generateToken = async (id) => {
  try {
    const user = await User.findById(id).select("-password");
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
      process.env.JWT_PRIVATE_KEY
    );
    return token;
  } catch (error) {
    return error;
  }
};
