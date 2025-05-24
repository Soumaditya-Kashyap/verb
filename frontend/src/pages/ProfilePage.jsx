import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Shield, Sparkles, Zap } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 relative overflow-hidden">
      {/* Animated neon background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        
        {/* Neon grid lines */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-pulse opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent animate-pulse opacity-30 animation-delay-1000"></div>
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-60`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto p-4 py-8">
        {/* Main Profile Card with neon glow */}
        <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-700/50 relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-500">
          
          {/* Neon border glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-lg transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
          <div className="relative z-10">
            
            {/* Header with neon accents */}
            <div className="text-center mb-12 relative">
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-bounce opacity-60 shadow-lg shadow-cyan-500/50"></div>
              <div className="absolute -top-4 -left-8 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse opacity-60 shadow-lg shadow-pink-500/50"></div>
              
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 drop-shadow-lg">
                Profile
              </h1>
              <p className="text-gray-300 text-lg opacity-90">Your profile information</p>
              
              <div className="flex justify-center mt-4 gap-2">
                <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
                <Zap className="w-6 h-6 text-purple-400 animate-pulse animation-delay-500" />
                <Sparkles className="w-6 h-6 text-pink-400 animate-pulse animation-delay-1000" />
              </div>
            </div>

            {/* Avatar Section with neon glow */}
            <div className="flex flex-col items-center gap-6 mb-12">
              <div className="relative group/avatar">
                {/* Rotating neon rings */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 rounded-full animate-spin-slow opacity-75 blur-sm"></div>
                <div className="absolute inset-1 bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 rounded-full animate-spin-slow-reverse opacity-50 blur-sm"></div>
                
                {/* Static neon glow */}
                <div className="absolute inset-2 bg-gradient-to-r from-cyan-500/50 to-purple-500/50 rounded-full blur-md group-hover/avatar:blur-lg transition-all duration-300"></div>
                
                {/* Avatar container */}
                <div className="relative">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-gray-700 shadow-2xl transform group-hover/avatar:scale-105 transition-all duration-500 relative">
                    {isUpdatingProfile ? (
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 shadow-lg shadow-cyan-400/50"></div>
                      </div>
                    ) : (
                      <img
                        src={selectedImg || authUser.profilePic || "/avatar.png"}
                        alt="Profile"
                        className="w-full h-full object-cover transform group-hover/avatar:scale-110 transition-transform duration-700"
                      />
                    )}
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Enhanced camera button with neon glow */}
                  <label
                    htmlFor="avatar-upload"
                    className={`
                      absolute bottom-2 right-2 w-12 h-12
                      bg-gradient-to-r from-cyan-500 to-purple-600 
                      hover:from-cyan-400 hover:to-purple-500
                      rounded-full cursor-pointer shadow-lg shadow-cyan-500/50
                      flex items-center justify-center
                      transform hover:scale-110 active:scale-95
                      transition-all duration-200
                      ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                      hover:shadow-xl hover:shadow-cyan-400/60
                      border-2 border-cyan-400/30 hover:border-cyan-400/70
                    `}
                  >
                    <Camera className="w-5 h-5 text-white drop-shadow-lg" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>
              </div>

              <p className="text-gray-300 text-sm text-center max-w-xs">
                {isUpdatingProfile ? (
                  <span className="flex items-center gap-2 justify-center text-cyan-400">
                    <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin shadow-sm shadow-cyan-400/50"></div>
                    Uploading your new photo...
                  </span>
                ) : (
                  "Click the camera icon to update your photo"
                )}
              </p>
            </div>

            {/* Profile Information Cards with neon accents */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Full Name Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/50 hover:bg-gray-800/70 transition-all duration-300 group/card relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center group-hover/card:scale-110 transition-transform duration-200 shadow-lg shadow-cyan-500/30">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-400 text-sm font-medium">Full Name</span>
                  </div>
                  <p className="text-white text-lg font-semibold">{authUser?.fullName}</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 hover:bg-gray-800/70 transition-all duration-300 group/card relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center group-hover/card:scale-110 transition-transform duration-200 shadow-lg shadow-purple-500/30">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-400 text-sm font-medium">Email Address</span>
                  </div>
                  <p className="text-white text-lg font-semibold break-all">{authUser?.email}</p>
                </div>
              </div>
            </div>

            {/* Account Information Card with enhanced neon styling */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300 relative overflow-hidden group/info">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover/info:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Account Information
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-4 px-4 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-cyan-400/50 hover:bg-gray-900/70 transition-all duration-200 group/item">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-cyan-400 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="text-gray-300 font-medium">Member Since</span>
                    </div>
                    <span className="text-white font-semibold">
                      {authUser.createdAt?.split("T")[0]}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between py-4 px-4 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-green-400/50 hover:bg-gray-900/70 transition-all duration-200 group/item">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                      <span className="text-gray-300 font-medium">Account Status</span>
                    </div>
                    <span className="text-green-400 font-semibold flex items-center gap-2">
                      Active
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-ping shadow-sm shadow-green-400/50"></div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 12s linear infinite;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;