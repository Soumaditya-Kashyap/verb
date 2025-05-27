import React, { use, useState } from 'react'
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from 'react';
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { Users, Wifi } from 'lucide-react';

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 flex flex-col transition-all duration-300 relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800/60 to-slate-900/80 backdrop-blur-sm"></div>
      
      {/* Header Section */}
      <div className="relative border-b border-slate-700/50 w-full p-5 bg-slate-800/30 backdrop-blur-sm">
        {/* Subtle top glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Users className="size-6 text-cyan-400" />
            <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm"></div>
          </div>
          <span className="font-semibold hidden lg:block text-slate-200">Contacts</span>
          
          {/* Live indicator */}
          <div className="hidden lg:flex items-center gap-1 ml-auto">
            <Wifi className="size-3 text-green-400 animate-pulse" />
            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Online Filter */}
        <div className="mt-4 hidden lg:flex items-center gap-3">
          <label className="cursor-pointer flex items-center gap-3 group">
            <div className="relative">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="sr-only"
              />
              {/* Custom checkbox */}
              <div className={`w-4 h-4 rounded border-2 transition-all duration-300 ${
                showOnlineOnly 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 border-cyan-400 shadow-lg shadow-cyan-500/30' 
                  : 'border-slate-500 hover:border-cyan-400 bg-slate-800/50'
              }`}>
                {showOnlineOnly && (
                  <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm text-slate-300 group-hover:text-cyan-400 transition-colors duration-200">
              Show online only
            </span>
          </label>
          
          {/* Online count badge */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full px-2 py-1 backdrop-blur-sm">
            <span className="text-xs text-green-300 font-medium">
              {onlineUsers.length - 1} online
            </span>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="relative overflow-y-auto w-full py-3 flex-1">
        {/* Scrollbar styling via CSS custom properties */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(51, 65, 85, 0.3);
            border-radius: 2px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #06b6d4, #8b5cf6);
            border-radius: 2px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #0891b2, #7c3aed);
          }
        `}</style>
        
        <div className="custom-scrollbar h-full overflow-y-auto">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-3 mx-2 mb-2 flex items-center gap-3 rounded-xl
                transition-all duration-300 group relative overflow-hidden
                ${selectedUser?._id === user._id 
                  ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 shadow-lg shadow-cyan-500/10" 
                  : "hover:bg-slate-800/40 border border-transparent hover:border-slate-700/50"
                }
              `}
            >
              {/* Hover glow effect */}
              {selectedUser?._id !== user._id && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 rounded-xl transition-all duration-300"></div>
              )}
              
              {/* Profile Picture with enhanced styling */}
              <div className="relative mx-auto lg:mx-0 flex-shrink-0">
                <div className="relative">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.name}
                    className="size-12 object-cover rounded-full border-2 border-slate-600/50 group-hover:border-cyan-400/30 transition-all duration-300"
                  />
                  
                  {/* Profile glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/0 to-purple-400/0 group-hover:from-cyan-400/10 group-hover:to-purple-400/10 transition-all duration-300"></div>
                  
                  {/* Online status indicator */}
                  {onlineUsers.includes(user._id) && (
                    <div className="absolute -bottom-0.5 -right-0.5">
                      <div className="size-4 bg-green-500 rounded-full border-2 border-slate-800 shadow-lg">
                        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-60"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* User Info - Enhanced Typography */}
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="font-semibold truncate text-slate-200 group-hover:text-white transition-colors duration-200">
                  {user.fullName}
                </div>
                <div className={`text-sm flex items-center gap-1 transition-colors duration-200 ${
                  onlineUsers.includes(user._id) 
                    ? "text-green-400" 
                    : "text-slate-500 group-hover:text-slate-400"
                }`}>
                  {onlineUsers.includes(user._id) && (
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>

              {/* Selection indicator */}
              {selectedUser?._id === user._id && (
                <div className="hidden lg:block w-1 h-8 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full"></div>
              )}
            </button>
          ))}
          
          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 px-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-800/50 rounded-full flex items-center justify-center border border-slate-700/50">
                <Users className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-slate-400 text-sm">No users found</p>
              <p className="text-slate-600 text-xs mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
    </aside>
  );
};

export default Sidebar;