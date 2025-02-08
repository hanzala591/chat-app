import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { loggedUser } from "../middlewares/loggedUser.middleware.js";
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", loggedUser, logout);
export default authRouter;
