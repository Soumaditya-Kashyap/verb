import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-4 border-b border-slate-700/50 relative overflow-hidden">
      {/* Starry background effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/30 to-slate-900/70 pointer-events-none" />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          {/* Enhanced Avatar with glow effect */}
          <div className="avatar group">
            <div className="size-12 rounded-full relative border-2 border-slate-600 group-hover:border-cyan-400 transition-all duration-300">
              <img 
                src={selectedUser.profilePic || "/avatar.png"} 
                alt={selectedUser.fullName}
                className="group-hover:brightness-110 transition-all duration-300"
              />
              {/* Online status indicator */}
              <div className={`absolute -bottom-1 -right-1 size-3.5 rounded-full border-2 border-slate-800 ${
                onlineUsers.includes(selectedUser._id) 
                  ? "bg-green-500 animate-pulse" 
                  : "bg-slate-500"
              }`} />
            </div>
          </div>

          {/* User info with subtle animation */}
          <div className="group">
            <h3 className="font-medium text-lg text-slate-100 group-hover:text-cyan-300 transition-colors duration-300">
              {selectedUser.fullName}
            </h3>
            <p className={`text-sm flex items-center gap-1 ${
              onlineUsers.includes(selectedUser._id) 
                ? "text-green-400" 
                : "text-slate-400"
            }`}>
              <span className={`inline-block size-2 rounded-full ${
                onlineUsers.includes(selectedUser._id) 
                  ? "bg-green-400 animate-pulse" 
                  : "bg-slate-500"
              }`} />
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Enhanced Close button with hover effect */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="p-1.5 rounded-full hover:bg-slate-700/50 hover:text-cyan-400 transition-all duration-300 group"
        >
          <X className="size-5 group-hover:rotate-90 transition-transform duration-500" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;