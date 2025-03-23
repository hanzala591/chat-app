import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import connectionDB from "./lib/connectionDB.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import { app, server } from "./lib/socket.js";
import express from "express";
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("public"));
app.use("/api/auth", authRouter);
app.use("/api/message", messageRoute);
app.use("/api/user", userRoute);
connectionDB().then(() => {
  console.log("MongoDb is Connected");
  server.listen(process.env.PORT || 8000, () => {
    console.log("App is Listening at Port 5000");
  });
});
