import express from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import { loggedUser } from "../middlewares/loggedUser.middleware.js";

const userRoute = express.Router();
userRoute.get("/getAllUsers", loggedUser, getAllUsers);

export default userRoute;
