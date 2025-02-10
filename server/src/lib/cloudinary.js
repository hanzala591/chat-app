import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config();
console.log("......");
console.log(process.env.CLOUD_NAME);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadFileOnCloudinary = async (filePath) => {
  if (!filePath) return null;
  try {
    const uploadedCloudinary = await cloudinary.uploader.upload(filePath);
    console.log(filePath);
    return uploadedCloudinary;
  } catch (error) {
    console.log(error);
  }
};
