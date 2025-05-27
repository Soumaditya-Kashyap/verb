import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

// Mock auth store hook for demo
const useAuthStore = () => ({
  signup: (data) => {
    console.log('Signup with:', data);
  },
  isSigningUp: false
});

// Mock toast for demo
const toast = {
  error: (message) => console.error(message)
};

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.03),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(147,51,234,0.02)_100%)]"></div>

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex">
        
        {/* Left Side - Signup Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-white mb-2 hover:text-cyan-400 transition-colors duration-300">
                Join VERB
              </h1>
              <p className="text-slate-400 text-lg">Create your account to get started</p>
            </div>

            {/* Signup Form */}
            <div className="space-y-6">
              
              {/* Full Name Field */}
              <div className="group">
                <label className="block text-sm font-medium text-slate-300 mb-2 group-hover:text-cyan-400 transition-colors duration-200">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-800/70 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 backdrop-blur-sm transition-all duration-300 hover:bg-slate-800/90 hover:border-slate-500"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-medium text-slate-300 mb-2 group-hover:text-cyan-400 transition-colors duration-200">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-slate-800/70 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 backdrop-blur-sm transition-all duration-300 hover:bg-slate-800/90 hover:border-slate-500"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-sm font-medium text-slate-300 mb-2 group-hover:text-cyan-400 transition-colors duration-200">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 pr-12 bg-slate-800/70 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 backdrop-blur-sm transition-all duration-300 hover:bg-slate-800/90 hover:border-slate-500"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-cyan-400 transition-all duration-200 hover:scale-110"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="button" 
                disabled={isSigningUp}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-cyan-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98]"
                onClick={handleSubmit}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-slate-400">
                Already have an account?{" "}
                <a href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-all duration-200 hover:underline underline-offset-4">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Clean Logo Design */}
        <div className="flex-1 flex items-center justify-center p-8 relative">
          
          {/* Main Logo Container */}
          <div className="relative group cursor-pointer">
            
            {/* 3D Logo Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-3xl blur-xl transform group-hover:scale-110 transition-all duration-500"></div>
            
            {/* Logo Card */}
            <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-16 transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10">
              
              {/* VERB Text with 3D effect */}
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="text-8xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text drop-shadow-2xl transform group-hover:scale-110 transition-all duration-500">
                    VERB
                  </div>
                  {/* 3D Shadow Effect */}
                  <div className="absolute top-2 left-2 text-8xl font-black text-slate-900/30 -z-10 transform group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-500">
                    VERB
                  </div>
                </div>
                
                <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full transform group-hover:w-32 transition-all duration-500"></div>
                
                <div className="space-y-4">
                  <p className="text-slate-300 text-xl font-medium max-w-sm mx-auto leading-relaxed">
                    The future of communication
                  </p>
                  <p className="text-slate-500 text-sm max-w-xs mx-auto">
                    Where conversations transcend boundaries
                  </p>
                </div>
              </div>
              
              {/* Floating accent dots */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 -left-4 w-2 h-2 bg-cyan-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-1/4 -right-4 w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
            </div>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-purple-600/0 group-hover:from-cyan-400/5 group-hover:to-purple-600/5 rounded-3xl transition-all duration-500 pointer-events-none"></div>
          </div>
          
          {/* Background geometric shapes */}
          <div className="absolute top-20 right-20 w-32 h-32 border border-slate-700/30 rounded-full transform rotate-45 hover:rotate-90 transition-transform duration-1000"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-slate-700/20 rounded-lg transform -rotate-12 hover:rotate-12 transition-transform duration-1000"></div>
          <div className="absolute top-1/2 right-32 w-16 h-16 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-full"></div>
          <div className="absolute bottom-1/3 left-32 w-20 h-20 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;