import { Camera, Mail, User } from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function Navbar() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState();
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = async () => {
      setSelectedImage(fileReader.result);
    };
    const formData = new FormData();
    console.log(typeof file);
    formData.append("profilePic", file);
    await updateProfile(formData);
  };
  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="sm:w-1/2  p-3 rounded text-center">
        <h1 className="text-xl font-bold my-2">Profile</h1>
        <p>Your profile Information</p>
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={authUser?.profilePic || selectedImage || `/avatar.png`}
              alt="Profile"
              className=" size-25 rounded-full object-cover border-4"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer duration-200 transition-all`}
            >
              <Camera className="w-5 h-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImage}
              />
            </label>
          </div>
        </div>
        <p className="my-2">Click the camera icon to update your photo.</p>
        <div className="form-control my-1.5">
          <label className="label flex items-center text-md   pb-1">
            <User className="size-5" />
            <span className="label-text ">Full Name</span>
          </label>
          <input
            type="text"
            name="email"
            className="input input-bordered w-full"
            defaultValue={authUser?.fullName}
          />
        </div>
        <div className="form-control my-1.5">
          <label className="label flex items-center text-md   pb-1">
            <Mail className="size-5" />
            <span className="label-text ">Email</span>
          </label>
          <input
            type="text"
            name="email"
            className="input input-bordered w-full"
            defaultValue={authUser?.email}
          />
        </div>
      </div>
    </div>
  );
}
