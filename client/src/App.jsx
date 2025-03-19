import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div
      className="h-screen flex flex-col bg-base-100 overflow-y-hidden"
      data-theme={theme}
    >
      <Navbar></Navbar>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home></Home> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login></Login> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup></Signup> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <Profile></Profile> : <Navigate to="/login" />}
        />
        <Route path="/setting" element={<Setting></Setting>} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
