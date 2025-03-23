import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { ImagePlus, Send, SendHorizonal } from "lucide-react";

export default function ChatSelected() {
  const { selectedUser, sendMessage, messages, receivedMessage, onlineUser } =
    useChatStore();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState();
  const scrollChatRef = useRef();
  useEffect(() => {
    setImage(null);
    setMessage("");
  }, [selectedUser]);

  useEffect(() => {
    receivedMessage();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div>
        <div className="flex pl-5 items-center">
          <div className="overflow-hidden rounded-full">
            {console.log(selectedUser)}
            <img
              src={selectedUser?.profilePic || "/avatar.png"}
              alt=""
              className="size-10"
            />
          </div>
          <div className="pl-3 py-1 justify-between">
            <p>{`${selectedUser.fullName
              .charAt(0)
              .toUpperCase()}${selectedUser.fullName.slice(1)}`}</p>
            <p>
              {onlineUser.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-base-300 rounded-xl ml-5 flex-grow">
        <div
          className="px-3 py-3 rounded-xl  overflow-hidden "
          ref={scrollChatRef}
        >
          {/* Chat Messages */}
          {messages.map((message, id) => (
            <div
              key={id}
              className={`flex py-2 ${
                message.receiver === selectedUser._id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`
                          max-w-[80%] rounded-xl px-4 py-1 shadow-sm
                          ${
                            message.receiver === selectedUser._id
                              ? "bg-primary text-primary-content"
                              : "bg-base-200"
                          }
                        `}
              >
                {message?.text && <p className="text-sm">{message.text}</p>}
                {message?.image && (
                  <img className="size-30" src={message.image} />
                )}
                <p
                  className={`
                            text-[10px] mt-1.5
                            ${
                              message.isSent
                                ? "text-primary-content/70"
                                : "text-base-content/70"
                            }
                          `}
                >
                  12:00 PM
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-2 px-7">
        <div className="flex justify-center items-center gap-3">
          <div className="flex-grow">
            <input
              type="text"
              id="first_name"
              className="bg-base-100 border border-gray-300 text-primary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Type a message..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              required
            />
          </div>
          <div className="">
            <label htmlFor="image-selected">
              <ImagePlus className="size-7 cursor-pointer" />
              <input
                type="file"
                id="image-selected"
                className="hidden"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </label>
          </div>
          <div>
            <SendHorizonal
              className="cursor-pointer"
              onClick={() => {
                const formData = new FormData();
                formData.append("text", message);
                formData.append("image", image);
                sendMessage(formData);
                setImage(null);
                setMessage("");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
