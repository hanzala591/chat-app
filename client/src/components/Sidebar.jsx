import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function Sidebar() {
  const { users, getAllUsers, selectUser, onlineUser, onlineUsers } =
    useChatStore();
  const { socket } = useAuthStore();
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);
  useEffect(() => {
    onlineUsers();
  }, []);

  return (
    <div className="ml-7  ">
      <div className="flex gap-3 border-b-4  border-base-100 py-3">
        <Users className="text-primary" />
        <p className="text-primary font-bold">Contacts</p>
      </div>
      <div>
        {users.map((v, i) => (
          <div
            className="h-full overflow-auto flex gap-2 cursor-pointer hover:bg-base-300 pl-3 py-2"
            key={i}
            onClick={() => {
              selectUser(v);
            }}
          >
            <div className=" overflow-hidden rounded-full">
              <img
                src={v?.profilePic || "/avatar.png"}
                alt=""
                className="size-10"
              />
            </div>
            <div>
              <p className="font-medium">{`${v.fullName
                .charAt(0)
                .toUpperCase()}${v.fullName.slice(1)}`}</p>
              <p>{onlineUser.includes(v._id) ? "Online" : "Offline"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
