import React, { use, useEffect } from 'react'
import Navbar from './components/Navbar'

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes , Route} from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore';

import { Loader } from "lucide-react";


const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

   useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log({authUser});

     if (isCheckingAuth && authUser) {
      return (
       <div className="flex items-center justify-center h-screen bg-gray-900">
         <div className="relative">
        <div className="absolute inset-0 rounded-full bg-white blur-md opacity-30 animate-pulse"></div>
        <Loader className="size-10 animate-spin text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      </div>
    </div>
     )
    };

    
   return (
    <div>
     <Navbar />

     <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

    </div>
  );
};

export default App;