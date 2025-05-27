import { MessageSquare, Sparkles, ArrowLeft, Zap } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 via-transparent to-slate-900/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(34,211,238,0.03),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.03),transparent_50%)]"></div>

      {/* Floating particles */}
      <div className="absolute top-20 left-20 w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-40 w-1 h-1 bg-cyan-300/50 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-300/20 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>

      {/* Main content */}
      <div className="relative max-w-lg text-center space-y-8 group">
        
        {/* Icon Display with 3D effects */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 w-32 h-32 border border-cyan-400/20 rounded-full animate-spin" style={{animationDuration: '15s'}}></div>
            <div className="absolute inset-2 w-28 h-28 border border-purple-400/15 rounded-full animate-spin" style={{animationDuration: '20s', animationDirection: 'reverse'}}></div>
            
            {/* Main icon container */}
            <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-2xl">
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
              
              {/* Icon */}
              <MessageSquare className="w-12 h-12 text-cyan-400 relative z-10 group-hover:text-cyan-300 transition-colors duration-300" />
              
              {/* Icon glow effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <MessageSquare className="w-12 h-12 text-cyan-400/20 blur-sm" />
              </div>
              
              {/* 3D shadow */}
              <div className="absolute inset-0 bg-slate-900/40 rounded-3xl transform translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
            </div>

            {/* Floating sparkles */}
            <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-purple-400 animate-pulse" />
            <Sparkles className="absolute -bottom-2 -left-2 w-3 h-3 text-cyan-400 animate-pulse" style={{animationDelay: '1s'}} />
            <Zap className="absolute top-1/2 -left-6 w-3 h-3 text-yellow-400 animate-pulse" style={{animationDelay: '0.5s'}} />
          </div>
        </div>

        {/* Welcome Text with enhanced styling */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text group-hover:from-cyan-300 group-hover:to-purple-300 transition-all duration-500">
            Welcome to VERB
          </h2>
          
          {/* Accent line */}
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full group-hover:w-32 transition-all duration-500"></div>
          
          <p className="text-lg text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
            Select a conversation from the sidebar to start chatting
          </p>
          
          <p className="text-sm text-slate-500 italic">
            Experience the future of communication
          </p>
        </div>

        {/* Interactive hint */}
        <div className="flex items-center justify-center gap-3 pt-8 group/hint">
          <ArrowLeft className="w-5 h-5 text-cyan-400 animate-pulse group-hover/hint:animate-bounce" />
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-3 group-hover/hint:bg-slate-800/70 group-hover/hint:border-cyan-500/30 transition-all duration-300 cursor-pointer">
            <span className="text-slate-300 text-sm font-medium group-hover/hint:text-cyan-400 transition-colors duration-300">
              Choose a contact to begin
            </span>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-3 gap-4 pt-8 opacity-60 group-hover:opacity-80 transition-opacity duration-500">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center mx-auto">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <p className="text-xs text-slate-500">Real-time</p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
            <p className="text-xs text-slate-500">Secure</p>
          </div>
          
          <div className="text-center space-y-2">
            <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center mx-auto">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            <p className="text-xs text-slate-500">Fast</p>
          </div>
        </div>
      </div>

      {/* Corner decorative elements */}
      <div className="absolute top-8 right-8 w-16 h-16 border border-slate-700/20 rounded-full transform rotate-45 animate-spin" style={{animationDuration: '25s'}}></div>
      <div className="absolute bottom-8 left-8 w-12 h-12 border border-slate-700/15 rounded-lg transform -rotate-12 animate-spin" style={{animationDuration: '30s', animationDirection: 'reverse'}}></div>
    </div>
  );
};

export default NoChatSelected;