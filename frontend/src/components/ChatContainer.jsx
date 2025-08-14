import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // Fetch & subscribe to messages when selectedUser changes
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
      return () => unsubscribeFromMessages();
    }
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-base-100 rounded-lg shadow-lg">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-base-100 rounded-lg shadow-lg">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {messages.map((message, idx) => {
          const isOwnMessage = message.senderId === authUser._id;

          return (
            <div
              key={message._id || idx}
              className={`flex items-end gap-3 ${isOwnMessage ? "justify-end" : "justify-start"}`}
              ref={idx === messages.length - 1 ? messageEndRef : null}
            >
              {/* Avatar (only on left side messages) */}
              {!isOwnMessage && (
                <div className="w-10 h-10 rounded-full overflow-hidden border border-base-300 shadow-sm flex-shrink-0">
                  <img
                    src={selectedUser.profilePic || "https://via.placeholder.com/150"}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-3 rounded-xl shadow-sm break-words ${
                  isOwnMessage
                    ? "bg-primary text-primary-content rounded-br-none"
                    : "bg-base-200 text-base-content rounded-bl-none"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="max-w-[200px] rounded-md mb-2 border border-base-300"
                  />
                )}
                {message.text && <p className="text-sm leading-relaxed">{message.text}</p>}
                <div className="text-[10px] text-right text-base-content/70 mt-1">
                  {formatMessageTime(message.createdAt)}
                </div>
              </div>

              {/* Avatar (only on right side messages) */}
              {isOwnMessage && (
                <div className="w-10 h-10 rounded-full overflow-hidden border border-base-300 shadow-sm flex-shrink-0">
                  <img
                    src={authUser.profilePic || "https://via.placeholder.com/150"}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
