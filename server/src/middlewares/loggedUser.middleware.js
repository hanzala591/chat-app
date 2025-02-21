import jwt from "jsonwebtoken";
import asyncHandler from "../lib/asyncHandler.js";
export const loggedUser = asyncHandler((req, res, next) => {
  console.log("done");
  const token = req?.cookies?.auth;

  if (req.cookies.auth) {
    const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = user;
  }
  console.log("done");

  next();
});
