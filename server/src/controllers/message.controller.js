import asyncHandler from "../lib/asyncHandler.js";
import Message from "../models/message.model.js";
import ApiError from "../lib/ApiError.js";
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

  if (!text) {
    throw new ApiError(500, "Message is not created.");
  }

  const message = await Message.create({
    sender: senderId,
    receiver: receiverId,
    text: text,
  });
  if (!message) {
    throw new ApiError(500, "Message is not created.");
  }
  return res.status(200).json(message);
});
