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
    return uploadedCloudinary;
  } catch (error) {
    console.log(error);
  }
};
export const deleteFileOnCloudinary = async (filePath) => {
  if (!filePath) return;
  try {
    const arrFilePath = filePath.split("/");
    const lastArrFilePath = arrFilePath[arrFilePath.length - 1];
    const arrpublicId = lastArrFilePath.split(".");
    const publicId = arrpublicId[0];
    const deletedCloudinary = await cloudinary.api.delete_resources(
      [publicId],
      {
        resource_type: "image",
      }
    );

    return deletedCloudinary;
  } catch (error) {
    console.log(error);
  }
};
