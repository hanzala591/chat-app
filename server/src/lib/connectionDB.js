import mongoose from "mongoose";

const connectionDB = async () => {
  try {
    const connectedDB = await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log("MongDb is not Connected", error);
  }
};
export default connectionDB;
