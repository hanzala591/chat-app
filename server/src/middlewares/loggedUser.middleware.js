import jwt from "jsonwebtoken";
import asyncHandler from "../lib/asyncHandler.js";
export const loggedUser = asyncHandler((req, res, next) => {
  const token = req.cookies.auth;
  console.log(jwt);
  const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  req.user = user;
  next();
});
