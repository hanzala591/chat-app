import express from "express";
import { getChatting, sendMessage } from "../controllers/message.controller.js";
import { loggedUser } from "../middlewares/loggedUser.middleware.js";
const messageRoute = express.Router();
messageRoute.get("/getChatting/:email", loggedUser, getChatting);
messageRoute.post("/sendMessage/:id", loggedUser, sendMessage);
export default messageRoute;
