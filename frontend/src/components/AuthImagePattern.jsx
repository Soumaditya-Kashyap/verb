import React, { useEffect, useRef } from 'react';

const AuthImagePattern = ({ title, subtitle }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    // Initialize particles after canvas sizing
    let particles = [];
    
    const initParticles = () => {
      particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.3 + Math.random() * 0.7,
        angle: Math.random() * Math.PI * 2,
        size: 1 + Math.random() * 2.5,
        opacity: 0.4 + Math.random() * 0.6,
        pulsePhase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? 'cyan' : 'purple'
      }));
    };

    const animate = () => {
      if (!canvas.width || !canvas.height) return;
      
      time += 0.015;
      
      // Clear with subtle fade effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw elegant connecting lines
      ctx.lineWidth = 1;
      particles.forEach((p1, i) => {
        particles.slice(i + 1, i + 3).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const opacity = ((120 - dist) / 120) * 0.4;
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, p1.color === 'cyan' ? `rgba(34, 211, 238, ${opacity})` : `rgba(139, 92, 246, ${opacity})`);
            gradient.addColorStop(1, p2.color === 'cyan' ? `rgba(34, 211, 238, ${opacity})` : `rgba(139, 92, 246, ${opacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      // Update and draw particles with enhanced effects
      particles.forEach(particle => {
        // Smooth movement
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        particle.angle += 0.003;

        // Boundary wrapping
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

        // Dynamic pulsing
        const pulse = Math.sin(time * 1.5 + particle.pulsePhase) * 0.4 + 0.8;
        const glowPulse = Math.sin(time * 2 + particle.pulsePhase) * 0.3 + 0.7;
        
        // Glow effect
        const glowSize = particle.size * pulse * 3;
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowSize
        );
        
        if (particle.color === 'cyan') {
          glowGradient.addColorStop(0, `rgba(34, 211, 238, ${particle.opacity * glowPulse * 0.3})`);
          glowGradient.addColorStop(1, 'rgba(34, 211, 238, 0)');
        } else {
          glowGradient.addColorStop(0, `rgba(139, 92, 246, ${particle.opacity * glowPulse * 0.3})`);
          glowGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
        }
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Core particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = particle.color === 'cyan' 
          ? `rgba(34, 211, 238, ${particle.opacity * pulse})` 
          : `rgba(139, 92, 246, ${particle.opacity * pulse})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex-1 relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Enhanced Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />

      {/* Sophisticated Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={`element-${i}`}
            className="absolute"
            style={{
              left: `${5 + (i * 8) % 90}%`,
              top: `${10 + (i * 7) % 80}%`,
              animation: `float-element ${12 + i * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            {i % 4 === 0 && (
              <div className="w-20 h-20 border-2 border-cyan-400/20 rounded-full relative">
                <div className="absolute inset-2 border border-cyan-400/30 rounded-full animate-pulse" style={{ animationDuration: `${2 + i * 0.3}s` }}></div>
              </div>
            )}
            {i % 4 === 1 && (
              <div className="w-16 h-16 border-2 border-purple-400/20 transform rotate-45 relative">
                <div className="absolute inset-1 bg-purple-400/10 animate-pulse" style={{ animationDuration: `${3 + i * 0.2}s` }}></div>
              </div>
            )}
            {i % 4 === 2 && (
              <div className="w-24 h-2 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent rounded-full"
                   style={{ animation: `glow-line ${5 + i * 0.5}s ease-in-out infinite` }}></div>
            )}
            {i % 4 === 3 && (
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400/20 to-cyan-400/20 rounded-full animate-spin" style={{ animationDuration: `${8 + i}s` }}></div>
                <div className="absolute inset-2 bg-slate-900 rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Premium Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={`ambient-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${150 + i * 40}px`,
              height: `${150 + i * 40}px`,
              left: `${15 + i * 12}%`,
              top: `${5 + i * 12}%`,
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? 'rgba(34, 211, 238, 0.15)' : 
                i % 3 === 1 ? 'rgba(139, 92, 246, 0.15)' : 
                'rgba(236, 72, 153, 0.15)'
              } 0%, transparent 60%)`,
              animation: `ambient-drift ${15 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <div className="w-full h-full" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
               `,
               backgroundSize: '60px 60px',
               animation: 'grid-flow 25s linear infinite'
             }}>
        </div>
      </div>

      {/* Flowing Energy Streams */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={`stream-${i}`}
            className="absolute w-full opacity-30"
            style={{
              height: '2px',
              top: `${25 + i * 15}%`,
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(34, 211, 238, 0.6) 25%, 
                rgba(139, 92, 246, 0.8) 50%, 
                rgba(236, 72, 153, 0.6) 75%, 
                transparent 100%)`,
              animation: `energy-flow ${20 + i * 3}s linear infinite`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="max-w-2xl text-center">
          {/* Enhanced VERB Logo */}
          <div className="relative mb-16 mx-auto w-56 h-56">
            {/* Multiple rotating rings */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-spin opacity-80" style={{ animationDuration: '8s' }}>
              <div className="absolute inset-2 rounded-full bg-slate-900/80 backdrop-blur-sm"></div>
            </div>
            
            <div className="absolute inset-4 rounded-full border-2 border-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 animate-spin opacity-60" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
              <div className="absolute inset-1 rounded-full bg-slate-900/60"></div>
            </div>
            
            {/* VERB Text with enhanced styling */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center bg-slate-900/90 backdrop-blur-xl px-8 py-6 rounded-2xl border border-white/10 shadow-2xl">
                <div className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse tracking-wider mb-2">
                  VERB
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mx-auto rounded-full animate-pulse"></div>
                <div className="text-xs text-white/60 mt-2 tracking-widest">CONNECT</div>
              </div>
            </div>

            {/* Enhanced pulsing rings */}
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-3 rounded-full border border-purple-400/30 animate-ping" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
            <div className="absolute inset-6 rounded-full border border-pink-400/20 animate-ping" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
            
            {/* Enhanced floating elements */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`logo-element-${i}`}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateX(120px) rotate(-${i * 45}deg)`,
                  animation: `orbit-float ${6 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                <div className={`w-8 h-6 rounded-full ${
                  i % 3 === 0 ? 'bg-gradient-to-br from-cyan-400/80 to-blue-500/80' :
                  i % 3 === 1 ? 'bg-gradient-to-br from-purple-400/80 to-pink-500/80' :
                  'bg-gradient-to-br from-blue-500/80 to-cyan-400/80'
                } shadow-lg`}>
                  <div className="absolute -bottom-1 left-2 w-0 h-0 border-l-2 border-r-2 border-t-3 border-transparent border-t-current opacity-80"></div>
                </div>
              </div>
            ))}

            {/* Data stream visualization */}
            {[...Array(6)].map((_, i) => (
              <div
                key={`data-${i}`}
                className="absolute w-2 bg-gradient-to-t from-transparent via-cyan-400/80 to-transparent rounded-full"
                style={{
                  height: '80px',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-60px)`,
                  animation: `data-pulse ${3 + i * 0.3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.6}s`,
                }}
              />
            ))}
          </div>

          {/* Enhanced Title and Subtitle */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl hover:bg-white/10 transition-all duration-700 hover:scale-105 hover:shadow-cyan-500/20">
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse leading-tight">
              {title}
            </h2>
            <p className="text-white/90 text-xl leading-relaxed max-w-lg mx-auto">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-element {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-15px) translateX(8px) rotate(2deg); }
          50% { transform: translateY(-8px) translateX(-8px) rotate(-1deg); }
          75% { transform: translateY(8px) translateX(5px) rotate(1deg); }
        }
        @keyframes glow-line {
          0%, 100% { opacity: 0.3; transform: scaleX(1) scaleY(1); }
          50% { opacity: 0.8; transform: scaleX(1.3) scaleY(1.5); }
        }
        @keyframes ambient-drift {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.15; }
          33% { transform: scale(1.2) translate(10px, -15px); opacity: 0.25; }
          66% { transform: scale(0.9) translate(-8px, 10px); opacity: 0.2; }
        }
        @keyframes grid-flow {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        @keyframes energy-flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes orbit-float {
          0%, 100% { transform: translate(-50%, -50%) rotate(var(--angle, 0deg)) translateX(120px) rotate(calc(-1 * var(--angle, 0deg))) translateY(0px) scale(1); }
          50% { transform: translate(-50%, -50%) rotate(var(--angle, 0deg)) translateX(120px) rotate(calc(-1 * var(--angle, 0deg))) translateY(-15px) scale(1.1); }
        }
        @keyframes data-pulse {
          0%, 100% { opacity: 0.4; height: 80px; transform: translate(-50%, -50%) rotate(var(--angle, 0deg)) translateY(-60px) scaleY(1); }
          50% { opacity: 1; height: 100px; transform: translate(-50%, -50%) rotate(var(--angle, 0deg)) translateY(-60px) scaleY(1.3); }
        }
      `}</style>
    </div>
  );
};

export default AuthImagePattern;