import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import React from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  return (
    <div className="w-full  px-10 py-3">
      <div className="flex justify-between items-center">
        <div className="flex text-primary items-center">
          <div className=" bg-primary/10 p-1.5 rounded">
            {" "}
            <MessageSquare className="text-primary " />
          </div>
          <h4 className="text-lg font-bold pb-1 ml-1">Chat App</h4>
        </div>
        <div className="flex gap-3">
          <div className="flex cursor-pointer">
            {" "}
            <Settings className="text-primary" />
            <p className="text-primary ml-0.5">Settings</p>
          </div>
          {authUser && (
            <div className="flex gap-3">
              <div className="flex cursor-pointer">
                <User className="text-primary" />
                <p className="text-primary ml-0.5">Profile</p>
              </div>
              <div className="flex cursor-pointer" onClick={logout}>
                <LogOut className="text-primary" />
                <p className="text-primary ml-0.5">Logout</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
