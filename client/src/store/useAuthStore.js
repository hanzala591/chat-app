import { create } from "zustand";
import { axiosInstance } from "../axios/axios";
export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  checkAuth: async () => {
    await axiosInstance
      .get("/auth/checkAuth")
      .then((res) => {
        console.log(res);
        set({ authUser: res.data });
      })
      .catch((err) => {
        console.log(err);
        set({ authUser: null });
      })
      .finally(() => {
        set({ isCheckingAuth: false });
      });
  },
}));
