import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../components/NoChatSelected";
import ChatSelected from "../components/ChatSelected";

export default function Home() {
  const { selectedUser, onlineUsers } = useChatStore();
  useEffect(() => {
    onlineUsers();
  }, []);
  return (
    <div className=" overflow-auto mx-20 my-5 bg-base-200 rounded-xl flex p-3 flex-grow">
      <div className=" w-3/10 border-r-4 border-base-100 overflow-y-scroll">
        <Sidebar />
      </div>
      <div className="w-7/10">
        {selectedUser ? <ChatSelected /> : <NoChatSelected />}
      </div>
    </div>
  );
}
