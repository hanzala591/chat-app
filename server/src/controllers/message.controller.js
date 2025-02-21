import asyncHandler from "../lib/asyncHandler.js";
import Message from "../models/message.model.js";
import ApiError from "../lib/ApiError.js";
import { uploadFileOnCloudinary } from "../lib/cloudinary.js";
import fs from "fs";
export const getChatting = asyncHandler(async (req, res) => {
  const { email: receiverId } = req.params;
  const senderId = req.user._id;
  const messages = await Message.find({
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId },
    ],
  });
  return res.send(messages);
});
export const sendMessage = asyncHandler(async (req, res) => {
  const { _id: senderId } = req.user;
  const { id: receiverId } = req.params;
  const { text } = req.body;
  const image = req.file;

  if (!text && !image) {
    throw new ApiError(500, "Please Enter Text or Attach Image");
  }
  let uploadedCloudinary;
  if (image) {
    uploadedCloudinary = await uploadFileOnCloudinary(image.path);
    fs.unlinkSync(image.path);
  }
  const message = await Message.create({
    sender: senderId,
    receiver: receiverId,
    text: text,
    image: uploadedCloudinary.secure_url,
  });
  if (!message) {
    throw new ApiError(500, "Message is not created.");
  }
  return res.status(200).json(message);
});
