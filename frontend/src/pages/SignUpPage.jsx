import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast, { Toaster } from "react-hot-toast";

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

  const colors = ["bg-emerald-400", "bg-blue-900", "bg-amber-400"];

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Define Keyframes for Sprinkle Effect */}
      <style>
        {`
          @keyframes sprinkle {
            0% {
              transform: translateY(0) translateX(0);
              opacity: 0.8;
            }
            50% {
              transform: translateY(50vh) translateX(calc(sin(2) * 20px));
              opacity: 0.5;
            }
            100% {
              transform: translateY(110vh) translateX(calc(sin(4) * 20px));
              opacity: 0;
            }
          }
          .animate-sprinkle {
            animation: sprinkle var(--duration) linear infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
          }
          .animate-pulse-custom {
            animation: pulse var(--duration) ease-in-out infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-custom {
            animation: spin var(--duration) linear infinite;
          }
          @keyframes spin-faster {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .group:hover .animate-spin-faster {
            animation: spin-faster 2s linear infinite;
          }
          @keyframes tilt-3d {
            0% { transform: translateZ(10px) rotateX(15deg) rotateY(15deg); }
            50% { transform: translateZ(10px) rotateX(-15deg) rotateY(-15deg); }
            100% { transform: translateZ(10px) rotateX(15deg) rotateY(15deg); }
          }
          .animate-3d-tilt {
            animation: tilt-3d 5s ease-in-out infinite;
          }
          .perspective-500 {
            perspective: 500px;
          }
        `}
      </style>

      {/* Animated Background - Sprinkle Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        {/* Sprinkles */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            return (
              <div
                key={i}
                className={`absolute rounded-full ${color} opacity-80 animate-sprinkle`}
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `-10%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 5}s`,
                  "--duration": `${5 + Math.random() * 5}s`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - SignUp Form */}
        <div className="flex flex-col justify-center items-center">
          <div className="w-full max-w-md">
            
            {/* Header with VERB Logo */}
            <div className="text-center mb-10">
              <div className="flex flex-col items-center gap-4 group">
                {/* Animated Logo Container with 3D Message Icon */}
            
                
                <div>
                  <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-emerald-400 via-blue-800 to-amber-400 bg-clip-text mb-2">
                    Create Account
                  </h1>
                  <p className="text-slate-400 text-lg">Embark on a cosmic journey with VERB</p>
                </div>
              </div>
            </div>

            {/* SignUp Form */}
            <div className="space-y-6">
              
              {/* Full Name Field */}
              <div className="relative group">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="relative transition-all duration-200 group-hover:-translate-y-0.5">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 group-hover:text-emerald-400 transition-colors duration-200" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 backdrop-blur-sm transition-all duration-200 group-hover:ring-2 group-hover:ring-emerald-400/30 group-hover:border-emerald-400/50"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                  {/* Input glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 via-blue-900/10 to-amber-500/10 opacity-0 group-focus-within:opacity-100 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Email Field */}
              <div className="relative group">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <div className="relative transition-all duration-200 group-hover:-translate-y-0.5">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 group-hover:text-emerald-400 transition-colors duration-200" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 backdrop-blur-sm transition-all duration-200 group-hover:ring-2 group-hover:ring-emerald-400/30 group-hover:border-emerald-400/50"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {/* Input glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 via-blue-900/10 to-amber-500/10 opacity-0 group-focus-within:opacity-100 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Password Field */}
              <div className="relative group">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative transition-all duration-200 group-hover:-translate-y-0.5">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-blue-800 group-hover:text-blue-800 transition-colors duration-200" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-12 pr-12 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-900/50 focus:border-blue-900/50 backdrop-blur-sm transition-all duration-200 group-hover:ring-2 group-hover:ring-blue-800/30 group-hover:border-blue-800/50"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-blue-800 hover:scale-110 transition-all duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                  {/* Input glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-900/10 via-amber-500/10 to-emerald-500/10 opacity-0 group-focus-within:opacity-100 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSigningUp}
                className="w-full relative group"
                onClick={handleSubmit}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-blue-900 to-amber-500 rounded-xl blur-lg opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-r from-emerald-500 via-blue-900 to-amber-500 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-2xl hover:shadow-blue-900/50 group-hover:from-emerald-400 group-hover:via-blue-800 group-hover:to-amber-400 group-hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                  {isSigningUp ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Signing up...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-slate-400">
                Already have an account?{" "}
                <Link to="/login" className="relative text-transparent bg-gradient-to-r from-emerald-400 to-blue-800 bg-clip-text hover:from-emerald-300 hover:to-blue-700 font-medium transition-all duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-emerald-400 after:to-blue-800 after:transition-all after:duration-300 hover:after:w-full">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center text-center p-8">
          <div className="relative mb-8 group">
            {/* Large VERB Logo with multiple glow layers */}
            <div className="relative transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
              <div className="w-48 h-48 rounded-full bg-gradient-to-r from-emerald-500 via-blue-900 to-amber-500 p-1 animate-pulse-custom" style={{animationDuration: '4s', "--duration": '4s'}}>
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <span className="text-6xl font-bold text-transparent bg-gradient-to-r from-emerald-400 via-blue-800 to-amber-400 bg-clip-text">
                    VERB
                  </span>
                </div>
              </div>
              {/* Multiple glow layers */}
              <div className="absolute inset-0 w-48 h-48 rounded-full bg-gradient-to-r from-emerald-500/20 via-blue-900/20 to-amber-500/20 blur-3xl animate-pulse-custom transition-all duration-300 group-hover:from-emerald-500/30 group-hover:via-blue-900/30 group-hover:to-amber-500/30 group-hover:blur-4xl" style={{animationDuration: '4s', animationDelay: '0.5s', "--duration": '4s'}}></div>
              <div className="absolute inset-0 w-48 h-48 rounded-full bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-blue-900/15 blur-2xl animate-pulse-custom transition-all duration-300 group-hover:from-amber-500/25 group-hover:via-emerald-500/25 group-hover:to-blue-900/25 group-hover:blur-3xl" style={{animationDuration: '4s', animationDelay: '1s', "--duration": '4s'}}></div>
            </div>
          </div>
          
          <div className="space-y-6 max-w-md">
            <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-emerald-400 via-blue-800 to-amber-400 bg-clip-text">
              Explore the Universe with VERB
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              Connect, communicate, and collaborate across the stars in a cosmic chat experience.
            </p>
            <p className="text-lg text-slate-400 italic">
              Where conversations transcend galaxies.
            </p>
          </div>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-emerald-500/10 to-blue-900/10 rounded-full blur-3xl animate-pulse-custom" style={{animationDuration: '4s', "--duration": '4s'}}></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-900/10 to-amber-500/10 rounded-full blur-3xl animate-pulse-custom" style={{animationDuration: '6s', animationDelay: '2s', "--duration": '6s'}}></div>

      {/* Toast Notifications */}
      <Toaster
        toastOptions={{
          duration: 4000,
          success: {
            style: {
              background: "#064e3b",
              color: "#ecfdf5",
              border: "1px solid #047857",
            },
          },
          error: {
            style: {
              background: "#7f1d1d",
              color: "#fee2e2",
              border: "1px solid #b91c1c",
            },
          },
        }}
      />
    </div>
  );
};

export default SignUpPage;