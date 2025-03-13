import { create } from "zustand";
import { axiosInstance } from "../axios/axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isUpdatingProfile: true,
  checkAuth: async () => {
    await axiosInstance
      .get("/auth/checkAuth", {
        withCredentials: true,
      })
      .then((res) => {
        set({ authUser: res.data.data });
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
      });
  },
  login: async (formData) => {
    await axiosInstance.post("auth/login", formData, {
      withCredentials: true, // Important for cookies to be sent
    });
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
  },
  getProfile: async () => {},
}));
