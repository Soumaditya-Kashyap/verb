import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        {/* Geometric Network Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            {/* Network lines */}
            <g stroke="url(#lineGradient)" strokeWidth="1" fill="none">
              <path d="M100,100 L200,150 L350,120 L500,200 L650,150 L800,180 L900,120" className="animate-pulse">
                <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="8s" repeatCount="indefinite" />
              </path>
              <path d="M150,300 L300,250 L450,300 L600,250 L750,300 L850,250" className="animate-pulse" style={{animationDelay: '2s'}}>
                <animate attributeName="stroke-dasharray" values="0,800;800,0;0,800" dur="6s" repeatCount="indefinite" />
              </path>
              <path d="M50,500 L250,450 L400,500 L550,450 L700,500 L900,450" className="animate-pulse" style={{animationDelay: '4s'}}>
                <animate attributeName="stroke-dasharray" values="0,900;900,0;0,900" dur="10s" repeatCount="indefinite" />
              </path>
              <path d="M200,700 L350,650 L500,700 L650,650 L800,700" className="animate-pulse" style={{animationDelay: '1s'}}>
                <animate attributeName="stroke-dasharray" values="0,600;600,0;0,600" dur="7s" repeatCount="indefinite" />
              </path>
            </g>
            {/* Network nodes */}
            <g fill="url(#lineGradient)">
              <circle cx="200" cy="150" r="3" className="animate-ping" style={{animationDelay: '1s'}} />
              <circle cx="500" cy="200" r="4" className="animate-ping" style={{animationDelay: '3s'}} />
              <circle cx="750" cy="300" r="3" className="animate-ping" style={{animationDelay: '5s'}} />
              <circle cx="400" cy="500" r="4" className="animate-ping" style={{animationDelay: '2s'}} />
              <circle cx="650" cy="650" r="3" className="animate-ping" style={{animationDelay: '4s'}} />
            </g>
          </svg>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce opacity-80" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-50" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Login Form */}
        <div className="flex flex-col justify-center items-center">
          <div className="w-full max-w-md">
            
            {/* Header with VERB Logo */}
            <div className="text-center mb-10">
              <div className="flex flex-col items-center gap-4">
                {/* Animated Logo Container with 3D Message Icon */}
                
                <div>
                  <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text mb-2">
                    Welcome Back
                  </h1>
                  <p className="text-slate-400 text-lg">Sign in to your account</p>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <div className="space-y-6">
              
              {/* Email Field */}
              <div className="relative group">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <div className="relative transition-all duration-200 group-hover:-translate-y-0.5">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors duration-200" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 backdrop-blur-sm transition-all duration-200 group-hover:ring-2 group-hover:ring-cyan-400/30 group-hover:border-cyan-400/50"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {/* Input glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-focus-within:opacity-100 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Password Field */}
              <div className="relative group">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative transition-all duration-200 group-hover:-translate-y-0.5">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-purple-400 transition-colors duration-200" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-12 pr-12 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 backdrop-blur-sm transition-all duration-200 group-hover:ring-2 group-hover:ring-purple-400/30 group-hover:border-purple-400/50"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-purple-400 hover:scale-110 transition-all duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                  {/* Input glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 opacity-0 group-focus-within:opacity-100 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="button" 
                disabled={isLoggingIn}
                className="w-full relative group"
                onClick={handleSubmit}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur-lg opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-pink-400 group-hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-slate-400">
                Don't have an account?{" "}
                <a href="/signup" className="relative text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text hover:from-cyan-300 hover:to-purple-300 font-medium transition-all duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-400 after:to-purple-400 after:transition-all after:duration-300 hover:after:w-full">
                  Create account
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center text-center p-8">
          <div className="relative mb-8 group">
            {/* Large VERB Logo with multiple glow layers */}
            <div className="relative transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
              <div className="w-48 h-48 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 p-1 animate-pulse">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <span className="text-6xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text">
                    VERB
                  </span>
                </div>
              </div>
              {/* Multiple glow layers */}
              <div className="absolute inset-0 w-48 h-48 rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl animate-pulse transition-all duration-300 group-hover:from-cyan-500/30 group-hover:via-purple-500/30 group-hover:to-pink-500/30 group-hover:blur-4xl" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute inset-0 w-48 h-48 rounded-full bg-gradient-to-r from-pink-500/15 via-cyan-500/15 to-purple-500/15 blur-2xl animate-pulse transition-all duration-300 group-hover:from-pink-500/25 group-hover:via-cyan-500/25 group-hover:to-purple-500/25 group-hover:blur-3xl" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
          
          <div className="space-y-6 max-w-md">
            <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text">
              Welcome to VERB
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              Connect, communicate, and collaborate in the most advanced chat experience ever created.
            </p>
            <p className="text-lg text-slate-400 italic">
              Where conversations come alive.
            </p>
          </div>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-ping" style={{animationDuration: '4s'}}></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-ping" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
    </div>
  );
};

export default LoginPage;