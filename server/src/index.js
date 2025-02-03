import express from "express";
import authRouter from "./routes/auth.route.js";
const app = express();

app.use("/api", authRouter);
app.listen(5000, () => {
  console.log("App is listening at port 5000");
});
