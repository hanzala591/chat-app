import { Eye, EyeOff, Lock, Mail, MessageSquare, User } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../axios/axios";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router";
import AuthImagePattern from "../components/AuthImagePattern";

export default function Signup() {
  const [hiddingPassword, setHiddingPassword] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { checkAuth, signup } = useAuthStore();

  const validateForm = () => {
    if (formData.fullName.trim() === "") {
      toast.error("Enter the name");
      return false;
    }
    if (formData.email.trim() === "") {
      toast.error("Enter the email");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Enter the Password Length > 6");
      return false;
    }
    return true;
  };
  const handleForm = async (e) => {
    e.preventDefault();
    const validate = validateForm();
    if (validate) {
      await signup(formData);
      checkAuth();
    }
  };
  return (
    <div className="h-full grid lg:grid-cols-2 ">
      {/* Left Side */}
      <div className=" flex  justify-center items-center p-4 sm:p-8 ">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-4">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with free account
              </p>
            </div>
          </div>
          <form className="space-y-6" onSubmit={handleForm}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  className="input input-bordered w-full pl-10"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  name="email"
                  className="input input-bordered w-full pl-10"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={hiddingPassword ? "password" : "text"}
                  name="password"
                  className="input input-bordered w-full pl-10"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={(e) => {
                    setHiddingPassword((val) => !val);
                  }}
                >
                  {hiddingPassword ? (
                    <Eye className="size-5 text-base-content/40" />
                  ) : (
                    <EyeOff className="size-5 text-base-content/40" />
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="p-4 bg-primary w-full rounded-md font-bold cursor-pointer"
            >
              Create Account
            </button>
            <p className="text-center ">
              Already have an account ?{" "}
              <Link to="/login" className="underline text-blue-600">
                Sign In
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loves ones."
      />
    </div>
  );
}
