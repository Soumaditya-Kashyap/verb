import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Navigate, useLocation } from 'react-router-dom';

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from "./store/useThemeStore";


import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";


const App = () => {
  const location = useLocation();
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser});

if (isCheckingAuth) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="relative flex items-center justify-center">
        {/* Glowing background with gradient and smoother pulse */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-40 animate-pulse-smooth"></div>
        {/* Secondary subtle ring effect */}
        <div className="absolute inset-0 rounded-full bg-white blur-lg opacity-20 animate-pulse-delayed"></div>
        {/* Loader icon with bounce and spin */}
        <Loader
          className="size-12 animate-spin-bounce text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]"
        />
      </div>
    </div>
  );
}

  return (
   <div data-theme={theme}>
       {location.pathname !== "/login" && location.pathname !== "/signup" && <Navbar />}

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" state={{ from: location }} replace />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" replace />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" replace />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" state={{ from: location }} replace />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" state={{ from: location }} replace />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;