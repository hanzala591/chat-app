import jwt from "jsonwebtoken";
import asyncHandler from "../lib/asyncHandler.js";
export const loggedUser = asyncHandler((req, res, next) => {
  console.log("clicked");
  const token = req?.cookies?.auth;
  console.log(req.cookies);
  if (req.cookies.auth) {
    const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = user;
  }

  next();
});
