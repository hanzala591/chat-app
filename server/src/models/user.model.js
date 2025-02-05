import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  fullName: {
    type: String,
  },
  password: {
    type: String,
  },
  profilePic: {
    type: String,
  },
});
const User = mongoose.model("User", userSchema);
export default User;
