import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});
const onlineUser = {};
io.on("connection", (socket) => {
  const user = socket.handshake.query.user;
  onlineUser[user] = socket.id;
  io.emit("OnlineUsers", Object.keys(onlineUser));
  socket.on("disconnect", () => {
    console.log("Socket is disconnected at", socket.id);
    delete onlineUser[user];
    io.emit("OnlineUsers", Object.keys(onlineUser));
  });
});

export function getSocketFromUserId(userId) {
  const socketId = onlineUser[userId];
  if (!socketId) return;
  return socketId;
}
export { app, server, io };
