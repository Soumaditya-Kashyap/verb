import React, { useEffect, useRef } from 'react';

const AuthImagePattern = ({ title, subtitle }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const particles = Array.from({ length: 40 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.2 + Math.random() * 0.8,
      angle: Math.random() * Math.PI * 2,
      size: 1 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.4,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    const animate = () => {
      time += 0.01;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle connecting lines
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.1)';
      ctx.lineWidth = 0.5;
      particles.forEach((p1, i) => {
        particles.slice(i + 1, i + 2).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.globalAlpha = (100 - dist) / 100 * 0.3;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        particle.angle += 0.002;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        const pulse = Math.sin(time + particle.pulsePhase) * 0.3 + 0.7;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${particle.opacity * pulse})`;
        ctx.fill();
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
    <div className="lg:flex items-center justify-center relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Subtle Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />

      {/* Gentle Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="absolute opacity-20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
              animation: `gentle-float ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          >
            {i % 3 === 0 && (
              <div className="w-16 h-16 border-2 border-cyan-400/30 rounded-full animate-pulse" 
                   style={{ animationDuration: `${3 + i}s` }}></div>
            )}
            {i % 3 === 1 && (
              <div className="w-12 h-12 border-2 border-purple-400/30 transform rotate-45" 
                   style={{ animation: `gentle-rotate ${6 + i}s linear infinite` }}></div>
            )}
            {i % 3 === 2 && (
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                   style={{ animation: `gentle-glow ${4 + i}s ease-in-out infinite` }}></div>
            )}
          </div>
        ))}
      </div>

      {/* Elegant Ambient Light Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={`light-${i}`}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 15}%`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? '#06b6d4' : '#8b5cf6'} 0%, transparent 70%)`,
              animation: `ambient-pulse ${10 + i * 3}s ease-in-out infinite`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px',
               animation: 'grid-drift 20s linear infinite'
             }}>
        </div>
      </div>

      {/* Elegant Flowing Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={`flow-${i}`}
            className="absolute w-full opacity-20"
            style={{
              height: '1px',
              top: `${30 + i * 20}%`,
              background: `linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.6), rgba(139, 92, 246, 0.6), transparent)`,
              animation: `flow-line ${15 + i * 5}s linear infinite`,
              animationDelay: `${i * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content Box - Keeping it exactly as you love it */}
      <div className="relative z-10 max-w-lg text-center px-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl transform hover:scale-105 transition-all duration-700 hover:bg-white/10">
          {/* VERB Logo Animation */}
          <div className="relative mb-12 mx-auto w-40 h-40">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-spin" style={{ animationDuration: '6s' }}>
              <div className="absolute inset-1 rounded-full bg-slate-900"></div>
            </div>
            
            {/* VERB Text in center */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center bg-slate-900 px-4 py-2 rounded-lg">
                <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse tracking-wider">
                  VERB
                </div>
                <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-2 animate-pulse"></div>
              </div>
            </div>

            {/* Pulsing energy rings */}
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-ping" style={{ animationDuration: '2s' }}></div>
            <div className="absolute inset-2 rounded-full border border-purple-400/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
            
            {/* Floating message bubbles around VERB */}
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

            {/* Data stream lines */}
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
              />
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

      <style jsx>{`
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-5px); }
          75% { transform: translateY(5px) translateX(3px); }
        }
        @keyframes gentle-rotate {
          0% { transform: rotate(45deg); }
          100% { transform: rotate(405deg); }
        }
        @keyframes gentle-glow {
          0%, 100% { opacity: 0.2; transform: scaleX(1); }
          50% { opacity: 0.5; transform: scaleX(1.2); }
        }
        @keyframes ambient-pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.3); opacity: 0.2; }
        }
        @keyframes grid-drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes flow-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float-bubble {
          0%, 100% { transform: translate(-50%, -50%) rotate(var(--angle)) translateX(80px) rotate(calc(-1 * var(--angle))) translateY(0px); }
          50% { transform: translate(-50%, -50%) rotate(var(--angle)) translateX(80px) rotate(calc(-1 * var(--angle))) translateY(-10px); }
        }
        @keyframes data-stream {
          0%, 100% { opacity: 0.3; height: 60px; }
          50% { opacity: 1; height: 80px; }
        }
      `}</style>
    </div>
  );
};

// Demo usage
export default function App() {
  return (
    <AuthImagePattern 
      title="Welcome to VERB" 
      subtitle="Connect, communicate, and collaborate in the most advanced chat experience ever created. Where conversations come alive."
    />
  );
}