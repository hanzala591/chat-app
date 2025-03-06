import express from "express";
import {
  signup,
  login,
  logout,
  updateProfilePic,
  updateSignup,
  checkAuth,
  cookieee,
} from "../controllers/auth.controller.js";
import { loggedUser } from "../middlewares/loggedUser.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup", upload.single("profilePic"), signup);
authRouter.post("/login", login);
authRouter.get("/signup", cookieee);
authRouter.post("/logout", loggedUser, logout);
authRouter.get("/checkAuth", loggedUser, checkAuth);
authRouter.post(
  "/updateProfilePic",
  loggedUser,
  upload.single("profilePic"),
  updateProfilePic
);
authRouter.post("/updateSignup", loggedUser, updateSignup);
export default authRouter;
