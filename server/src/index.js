import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import connectionDB from "./lib/connectionDB.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("public"));
app.use("/api/auth", authRouter);
connectionDB().then(() => {
  console.log("MongoDb is Connected");
  app.listen(process.env.PORT || 8000, () => {
    console.log("App is Listening at Port 5000");
  });
});
