import { create } from "zustand";
import { axiosInstance } from "../axios/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isLoadingUser: false,
  isLoadingChat: false,
  onlineUser: [],

  getAllUsers: async () => {
    const res = await axiosInstance.get("/user/getAllUsers", {
      withCredentials: true,
    });
    set({ users: res.data.data });
  },
  getAllChatSelectedUser: async (user) => {
    const res = await axiosInstance.get(`/message/getChatting/${user?._id}`, {
      withCredentials: true,
    });
    set({ messages: res.data });
  },
  selectUser: async (user) => {
    set({ selectedUser: user });
    get().getAllChatSelectedUser(user);
  },
  sendMessage: async (formData) => {
    const res = await axiosInstance.post(
      `/message/sendMessage/${get().selectedUser?._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
        withCredentials: true,
      }
    );
    if (res) {
      set({ messages: [...get().messages, res.data] });
    }
  },
  receivedMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      set({ messages: [...get().messages, newMessage] });
    });
  },
  onlineUsers: () => {
    const socket = useAuthStore.getState().socket;
    socket.on("OnlineUsers", (onlineuser) => {
      set({ onlineUser: onlineuser });
    });
  },
}));
