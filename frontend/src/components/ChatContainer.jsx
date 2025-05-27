import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';

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

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }  

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            {/* Enlarged avatar with enhanced hover effects */}
            <div className="chat-image avatar group">
              <div className="size-14 rounded-full border-2 border-slate-600 group-hover:border-2 group-hover:border-cyan-400 transition-all duration-300 transform group-hover:scale-105">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                  className="group-hover:brightness-110 transition-all duration-300"
                />
              </div>
            </div>
            
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1 hover:opacity-100 transition-opacity duration-200">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            
            {/* Enhanced chat bubble with hover glow */}
            <div 
              className={`chat-bubble flex flex-col ${
                message.senderId === authUser._id 
                  ? 'bg-cyan-500/20 hover:bg-cyan-500/30 hover:shadow-[0_0_8px_rgba(34,211,238,0.2)]' 
                  : 'bg-slate-700/50 hover:bg-slate-700/60 hover:shadow-[0_0_8px_rgba(148,163,184,0.2)]'
              } transition-all duration-300`}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[220px] rounded-md mb-2 hover:scale-[1.02] transition-transform duration-300 cursor-zoom-in"
                />
              )}
              {message.text && (
                <p className="hover:text-slate-50 transition-colors duration-200">
                  {message.text}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;