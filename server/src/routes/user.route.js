import express from "express";
import { getAllUsers } from "../controllers/user.controller.js";

const userRoute = express.Router();
userRoute.get("/getAllUsers", getAllUsers);

export default userRoute;
