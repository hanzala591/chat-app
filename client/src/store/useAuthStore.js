import { create } from "zustand";
import { axiosInstance } from "../axios/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL = "http://localhost:5000";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isUpdatingProfile: true,
  socket: null,

  checkAuth: async () => {
    await axiosInstance
      .get("/auth/checkAuth", {
        withCredentials: true,
      })
      .then((res) => {
        set({ authUser: res.data.data });
        get().connectionSocket();
      })
      .catch((err) => {
        console.log(`Respone ${err}`);
        set({ authUser: null });
      })
      .finally(() => {
        set({ isCheckingAuth: false });
      });
  },
  signup: async (formData) => {
    await axiosInstance
      .post("/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
        withCredentials: true, // Important for cookies to be sent
      })
      .then((res) => {
        toast.success("User is Logged.");
        get().connectionSocket();
      });
    if (res) {
      await get().checkAuth();
      get().connectionSocket();
    }
  },
  login: async (formData) => {
    const res = await axiosInstance.post("/auth/login", formData, {
      withCredentials: true, // Important for cookies to be sent
    });
    if (res) {
      await get().checkAuth();
      get().connectionSocket();
    }
  },
  logout: async () => {
    await axiosInstance.post("/auth/logout", null, {
      headers: {
        "Content-Type": "multipart/form-data", // Important for file uploads
      },
      withCredentials: true, // Important for cookies to be sent
    });
    set({ authUser: null });
    toast.success("User is Logged Out");
    get().disconnectSocket();
  },
  updateProfile: async (formData) => {
    const response = await axiosInstance.put(
      "/auth/updateProfilePic",
      formData,
      {
        withCredentials: true,
      }
    );
    set({ authUser: response.data });
    get().connectionSocket();
  },
  getProfile: async () => {},
  connectionSocket: async () => {
    console.log("connection");
    const { authUser, socket } = get();
    if (authUser || socket?.disconnected) {
      const socket = io(BASE_URL, {
        query: {
          user: authUser._id,
        },
      });
      socket.connect();
      set({ socket: socket });
    }
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket?.disconnect();
    }
  },
}));
