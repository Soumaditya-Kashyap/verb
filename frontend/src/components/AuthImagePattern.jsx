import React, { useEffect, useRef } from 'react';

const AuthImagePattern = ({ title, subtitle }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    // Minimal starfield
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      size: 0.5 + Math.random() * 1.5,
      opacity: 0.3 + Math.random() * 0.5,
      color: `hsl(${180 + Math.random() * 60}, 80%, 70%)`,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    // Aurora waves
    const auroras = Array.from({ length: 3 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: canvas.offsetHeight * (0.3 + Math.random() * 0.4),
      width: 200 + Math.random() * 300,
      height: 100 + Math.random() * 150,
      color: `hsla(${180 + Math.random() * 60}, 70%, 50%, 0.2)`,
      phase: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.02,
    }));

    const animate = () => {
      time += 0.016;
      ctx.fillStyle = 'rgba(10, 15, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw aurora waves
      auroras.forEach(aurora => {
        const gradient = ctx.createLinearGradient(
          aurora.x, aurora.y - aurora.height,
          aurora.x, aurora.y + aurora.height
        );
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, aurora.color);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(aurora.x - aurora.width / 2, aurora.y);
        for (let i = -aurora.width / 2; i <= aurora.width / 2; i += 10) {
          const x = aurora.x + i;
          const y = aurora.y + Math.sin(i * 0.02 + time * aurora.speed + aurora.phase) * aurora.height * 0.3;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(aurora.x + aurora.width / 2, aurora.y);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.shadowColor = aurora.color.replace('0.2', '0.3');
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw stars with twinkle
      stars.forEach(star => {
        const twinkle = Math.sin(time * 2 + star.twinklePhase) * 0.2 + 0.8;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * twinkle, 0, Math.PI * 2);
        ctx.fillStyle = star.color.replace('70%', `${70 * twinkle}%`);
        ctx.globalAlpha = star.opacity * twinkle;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="lg:flex items-center justify-center relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />

      {/* Orbital Paths */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={`orbit-${i}`}
            className="absolute rounded-full border border-cyan-400/20"
            style={{
              width: `${200 + i * 100}px`,
              height: `${100 + i * 50}px`,
              top: `${30 + i * 15}%`,
              left: `${10 + i * 20}%`,
              animation: `orbit-spin ${8 + i * 2}s linear infinite`,
              animationDelay: `${i * 1}s`,
              transform: 'translate(-50%, -50%) rotateX(60deg)',
              boxShadow: '0 0 10px rgba(6, 182, 212, 0.3)',
            }}
          >
            <div
              className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500"
              style={{
                top: '50%',
                left: '0%',
                transform: 'translate(-50%, -50%)',
                animation: `orbit-move ${8 + i * 2}s linear infinite reverse`,
                boxShadow: '0 0 12px rgba(6, 182, 212, 0.5)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Glowing Cosmic Nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={`node-${i}`}
            className="absolute rounded-full"
            style={{
              width: '8px',
              height: '8px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, hsl(${180 + Math.random() * 60}, 80%, 70%), transparent)`,
              animation: `node-pulse ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              boxShadow: '0 0 8px rgba(6, 182, 212, 0.4)',
            }}
          />
        ))}
      </div>

      {/* Subtle Nebula Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-full h-full opacity-10"
          style={{
            background: `radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.2), transparent 70%)`,
            animation: `nebula-glow 10s ease-in-out infinite`,
          }}
        />
        <div
          className="absolute w-full h-full opacity-10"
          style={{
            background: `radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.2), transparent 70%)`,
            animation: `nebula-glow 12s ease-in-out infinite`,
            animationDelay: '2s',
          }}
        />
      </div>

      {/* Main Content - VERB Logo with Animated Background */}
      <div className="relative z-10 max-w-lg text-center px-8">
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl transform hover:scale-105 transition-all duration-700 overflow-hidden">
          {/* Animated Card Background */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15), rgba(168, 85, 247, 0.1), transparent 70%)`,
              animation: `gradient-pulse 8s ease-in-out infinite`,
              boxShadow: 'inset 0 0 20px rgba(6, 182, 212, 0.2)',
            }}
          />
          {/* Micro-Particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: `radial-gradient(circle, hsl(${180 + i * 30}, 80%, 70%), transparent)`,
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateX(60px)`,
                animation: `particle-orbit ${4 + i * 0.5}s linear infinite`,
                animationDelay: `${i * 0.3}s`,
                boxShadow: '0 0 6px rgba(6, 182, 212, 0.3)',
              }}
            />
          ))}
          {/* Glowing Edge Effect */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              border: '2px solid transparent',
              borderImage: `linear-gradient(90deg, rgba(6, 182, 212, 0.3), rgba(168, 85, 247, 0.3), transparent) 1`,
              animation: `glow-edge 6s ease-in-out infinite`,
            }}
          />

          <div className="relative z-10">
            <div className="relative mb-12 mx-auto w-40 h-40">
              <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-spin" style={{ animationDuration: '6s' }}>
                <div className="absolute inset-1 rounded-full bg-slate-900"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center bg-slate-900 px-4 py-2 rounded-lg">
                  <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse tracking-wider">
                    VERB
                  </div>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-2 animate-pulse"></div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-ping" style={{ animationDuration: '2s' }}></div>
              <div className="absolute inset-2 rounded-full border border-purple-400/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-6 h-4 rounded-full bg-gradient-to-br from-cyan-400/60 to-blue-500/60"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateX(80px) rotate(-${i * 60}deg)`,
                    animation: `float-bubble 4s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  <div className="absolute -bottom-1 left-1 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-cyan-400/60"></div>
                </div>
              ))}
              {[...Array(4)].map((_, i) => (
                <div
                  key={`stream-${i}`}
                  className="absolute w-1 bg-gradient-to-t from-transparent via-cyan-400/60 to-transparent"
                  style={{
                    height: '60px',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateY(-40px)`,
                    animation: `data-stream 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                ></div>
              ))}
            </div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              {title}
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes orbit-spin {
          0% { transform: translate(-50%, -50%) rotateX(60deg) rotateZ(0deg); }
          100% { transform: translate(-50%, -50%) rotateX(60deg) rotateZ(360deg); }
        }
        @keyframes orbit-move {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateX(100%) rotate(-0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(100%) rotate(-360deg); }
        }
        @keyframes node-pulse {
          0%, 100% { transform: scale(1); opacity: 0.75; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        @keyframes nebula-glow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.1); }
        }
        @keyframes float-bubble {
          0%, 100% { transform: translate(-50%, -50%) rotate(var(--angle)) translateX(80px) rotate(calc(-1 * var(--angle))) translateY(0px); }
          50% { transform: translate(-50%, -50%) rotate(var(--angle)) translateX(80px) rotate(calc(-1 * var(--angle))) translateY(-10px); }
        }
        @keyframes data-stream {
          0%, 100% { opacity: 0.3; height: 60px; }
          50% { opacity: 1; height: 80px; }
        }
        @keyframes gradient-pulse {
          0% { background: radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15), rgba(168, 85, 247, 0.1), transparent 70%); }
          50% { background: radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15), rgba(6, 182, 212, 0.1), transparent 70%); }
          100% { background: radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15), rgba(168, 85, 247, 0.1), transparent 70%); }
        }
        @keyframes particle-orbit {
          0% { transform: translate(-50%, -50%) rotate(var(--angle)) translateX(60px); }
          100% { transform: translate(-50%, -50%) rotate(calc(var(--angle) + 360deg)) translateX(60px); }
        }
        @keyframes glow-edge {
          0%, 100% { border-image: linear-gradient(90deg, rgba(6, 182, 212, 0.3), rgba(168, 85, 247, 0.3), transparent) 1; }
          50% { border-image: linear-gradient(90deg, rgba(168, 85, 247, 0.3), rgba(6, 182, 212, 0.3), transparent) 1; }
        }
      `}</style>
    </div>
  );
};

export default function App() {
  return (
    <AuthImagePattern 
      title="Welcome to VERB" 
      subtitle="Connect, communicate, and collaborate in the most advanced chat experience ever created. Where conversations come alive."
    />
  );
}