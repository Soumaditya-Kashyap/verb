import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User, Zap } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300">
      {/* Enhanced glassmorphism background with particle effects */}
      <div className="bg-black/30 backdrop-blur-2xl border-b border-gray-800/50 shadow-2xl relative overflow-hidden">
        
        {/* Dynamic neon glow line */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-[pulse_3s_ease-in-out_infinite]"></div>
        
        {/* Quantum grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        
        <div className="container mx-auto px-4 h-16 relative z-10">
          <div className="flex items-center justify-between h-full">
            
            {/* Futuristic Logo Section */}
            <div className="flex items-center gap-8">
              <Link 
                to="/" 
                className="flex items-center gap-3 hover:scale-105 transition-all duration-500 group"
              >
                {/* Holographic cube logo */}
                <div className="relative w-10 h-10">
                  {/* Cube faces */}
                  <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
                  <div className="absolute inset-0 border-2 border-purple-400/50 rounded-sm -rotate-45 group-hover:-rotate-90 transition-transform duration-700"></div>
                  
                  {/* Core glow */}
                  <div className="absolute inset-1 rounded-sm bg-gradient-to-br from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Floating dot */}
                  <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-[3] group-hover:bg-cyan-300 transition-all duration-300"></div>
                </div>
                
                {/* Enhanced brand name */}
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-purple-300 transition-all duration-500 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
                  VERB
                </h1>
                
                {/* Animated energy pulse */}
                <div className="relative ml-1">
                  <Zap className="w-5 h-5 text-cyan-400/80 animate-[pulse_1.5s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-sm scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                </div>
              </Link>
            </div>

            {/* Enhanced Navigation Buttons */}
            <div className="flex items-center gap-4">
              
              {authUser && (
                <>
                  {/* Profile Button - Holographic Style */}
                  <Link 
                    to="/profile" 
                    className="group relative px-4 py-2.5 rounded-lg bg-gray-900/50 backdrop-blur-md border border-gray-700/50 hover:border-purple-400/70 transition-all duration-300 hover:shadow-[0_0_15px_-3px_rgba(192,132,252,0.3)]"
                  >
                    {/* Holographic projection effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -bottom-1 left-1/2 h-1 w-10 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 transform -translate-x-1/2"></div>
                    
                    <div className="relative flex items-center gap-3">
                      <div className="relative">
                        <User className="w-5 h-5 text-gray-300 group-hover:text-purple-300 transition-colors duration-300" />
                        {/* Holographic duplicate */}
                        <User className="absolute inset-0 w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-40 blur-[2px] transition-opacity duration-300 -translate-y-0.5" />
                      </div>
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                        Profile
                      </span>
                    </div>
                  </Link>

                  {/* Logout Button - Cyberpunk Style */}
                  <button 
                    onClick={logout}
                    className="group relative px-4 py-2.5 rounded-lg bg-gray-900/50 backdrop-blur-md border border-gray-700/50 hover:border-red-400/70 transition-all duration-300 hover:shadow-[0_0_15px_-3px_rgba(239,68,68,0.3)]"
                  >
                    {/* Scan line effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-red-500/5 to-transparent bg-[length:100%_2px] bg-repeat-y opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -bottom-1 left-1/2 h-1 w-10 bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 transform -translate-x-1/2"></div>
                    
                    <div className="relative flex items-center gap-3">
                      <div className="relative">
                        <LogOut className="w-5 h-5 text-gray-300 group-hover:text-red-300 transition-colors duration-300" />
                        {/* Digital glitch effect */}
                        <LogOut className="absolute inset-0 w-5 h-5 text-red-400 opacity-0 group-hover:opacity-40 blur-[1px] transition-opacity duration-300 translate-x-0.5 translate-y-0.5" />
                      </div>
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                        Logout
                      </span>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quantum particle field */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-cyan-400/40 to-purple-400/40 animate-float"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 15 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;