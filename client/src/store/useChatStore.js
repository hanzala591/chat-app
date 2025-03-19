import { create } from "zustand";
import { axiosInstance } from "../axios/axios";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isLoadingUser: false,
  isLoadingChat: false,

  getAllUsers: async () => {
    const res = await axiosInstance.get("/user/getAllUsers", {
      withCredentials: true,
    });
    set({ users: res.data.data });
  },
  selectUser: async (user) => {
    set({ selectedUser: user });
    const res = await axiosInstance.get(`/message/getChatting/${user._id}`, {
      withCredentials: true,
    });
    set({ messages: res.data });
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
  },
}));
