import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "cupcake",
  setTheme: (mytheme) => {
    localStorage.setItem("chat-theme", mytheme);
    set({ theme: mytheme });
  },
}));
