import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,211,238,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.08),transparent_50%)]"></div>
      
      {/* Subtle animated particles */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-cyan-300/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-300/30 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>

      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-cyan-500/10 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-purple-500/10 rounded-lg rotate-45 animate-spin" style={{animationDuration: '25s', animationDirection: 'reverse'}}></div>

      {/* Main container - removed max-w-6xl constraint */}
      <div className="relative z-10 flex items-center justify-center min-h-screen pt-20 px-4">
        <div className="group w-full h-[calc(100vh-8rem)]">
          
          {/* Glass morphism container */}
          <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl h-full transform transition-all duration-700 hover:shadow-cyan-500/10 hover:shadow-2xl">
            
            {/* Gradient border effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            
            {/* Inner glow effect */}
            <div className="absolute inset-[1px] bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl"></div>
            
            {/* Content container - full width */}
            <div className="relative flex h-full rounded-2xl overflow-hidden">
              
              {/* Sidebar - unchanged from original */}
              <div className="relative border-r border-slate-700/50">
                <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"></div>
                <Sidebar />
              </div>
              
              {/* Main chat area - now takes remaining space */}
              <div className="flex-1 relative flex flex-col">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 via-transparent to-slate-900/20 pointer-events-none"></div>
                
                {/* Chat content - flex-col to push input to bottom */}
                <div className="relative h-full flex flex-col">
                  {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                </div>
                
                {/* Corner accent elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-purple-400/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
            
            {/* 3D depth shadow */}
            <div className="absolute inset-0 bg-slate-900/20 rounded-2xl transform translate-x-1 translate-y-1 -z-20 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>
          </div>
          
          {/* Floating accent dots around container */}
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute -top-2 -right-2 w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>
      </div>
      
      {/* Top brand indicator */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-slate-800/60 backdrop-blur-lg border border-slate-700/50 rounded-full px-6 py-2 flex items-center gap-2 hover:bg-slate-800/80 transition-all duration-300 group cursor-pointer">
          <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
          <span className="text-slate-300 font-medium text-sm group-hover:text-white transition-colors duration-300">VERB</span>
          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;