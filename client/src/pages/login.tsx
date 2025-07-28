import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TEMP: Replace with real auth
    if (email === "test@vorta.ai" && password === "password") {
      setLocation("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] p-6 text-white">
      {/* LEFT CARD */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-1/2 bg-gradient-to-br from-[#1c2340] to-[#2a3b5c] rounded-3xl mr-3 flex flex-col justify-center px-8 md:px-12 shadow-2xl border border-blue-500/20"
      >
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Welcome back to VORTA</h1>
          <p className="text-sm text-gray-300 mb-8">Log in to access your AI Copilot and make smarter decisions in real time.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-[#0f1629] border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl bg-[#0f1629] border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all font-medium shadow-lg hover:shadow-blue-500/25"
            >
              Log in
            </button>
          </form>

          <p className="text-sm text-gray-400 mt-6 text-center">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-400 underline hover:text-blue-300 transition-colors">Sign up</a>
          </p>
        </div>
      </motion.div>

      {/* RIGHT CARD */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="hidden md:block md:w-1/2 bg-gradient-to-br from-[#0a0a1a] to-[#1a1a2e] rounded-3xl ml-3 relative overflow-hidden shadow-2xl border border-blue-500/20"
      >
        {/* Cinematic Fluid Neon Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Deep black-to-navy base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a1a] via-[#0f1019] to-[#1a1a2e]"></div>
          
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1920 1080"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Premium neon-blue gradients for luxury feel */}
              <radialGradient id="neonCore" cx="50%" cy="40%">
                <stop offset="0%" style={{ stopColor: '#00d4ff', stopOpacity: 0.8 }} />
                <stop offset="20%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.6 }} />
                <stop offset="40%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
                <stop offset="60%" style={{ stopColor: '#1e40af', stopOpacity: 0.25 }} />
                <stop offset="80%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.1 }} />
                <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
              </radialGradient>
              
              <radialGradient id="neonGlow" cx="30%" cy="70%">
                <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 0.7 }} />
                <stop offset="30%" style={{ stopColor: '#3b82f6', stopOpacity: 0.5 }} />
                <stop offset="60%" style={{ stopColor: '#1e40af', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
              </radialGradient>

              <linearGradient id="fluidWave1" x1="0%" y1="30%" x2="100%" y2="70%">
                <stop offset="0%" style={{ stopColor: '#000000', stopOpacity: 0.95 }} />
                <stop offset="15%" style={{ stopColor: '#0f1019', stopOpacity: 0.8 }} />
                <stop offset="35%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.6 }} />
                <stop offset="55%" style={{ stopColor: '#1e40af', stopOpacity: 0.5 }} />
                <stop offset="75%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
                <stop offset="90%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#00d4ff', stopOpacity: 0.2 }} />
              </linearGradient>
              
              <linearGradient id="fluidWave2" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0a0a1a', stopOpacity: 0.9 }} />
                <stop offset="25%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.7 }} />
                <stop offset="50%" style={{ stopColor: '#1e40af', stopOpacity: 0.5 }} />
                <stop offset="75%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.3 }} />
              </linearGradient>
              
              <linearGradient id="fluidWave3" x1="40%" y1="20%" x2="60%" y2="80%">
                <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 0.6 }} />
                <stop offset="30%" style={{ stopColor: '#3b82f6', stopOpacity: 0.5 }} />
                <stop offset="60%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.3 }} />
              </linearGradient>

              <linearGradient id="lightStreak" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#00d4ff', stopOpacity: 0.8 }} />
                <stop offset="30%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.6 }} />
                <stop offset="70%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.2 }} />
              </linearGradient>
              
              {/* Glowing highlight definition */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Ambient neon lighting base */}
            <ellipse cx="800" cy="400" rx="1200" ry="700" fill="url(#neonCore)" />
            <ellipse cx="1300" cy="800" rx="900" ry="500" fill="url(#neonGlow)" />
            <ellipse cx="400" cy="200" rx="600" ry="400" fill="url(#neonCore)" opacity="0.6" />
            
            {/* Continuous fluid wave layers - no abrupt cuts */}
            
            {/* Deep background wave - extends beyond viewBox */}
            <path
              d="M-200,800 Q100,650 400,700 Q700,750 1000,680 Q1300,610 1600,650 Q1800,670 2000,660 Q2200,650 2400,640 L2400,1200 L-200,1200 Z"
              fill="url(#fluidWave1)"
            />
            
            {/* Mid-depth flowing wave */}
            <path
              d="M-200,880 Q50,730 350,780 Q650,830 950,760 Q1250,690 1550,730 Q1750,750 1950,740 Q2150,730 2400,720 L2400,1200 L-200,1200 Z"
              fill="url(#fluidWave2)"
            />
            
            {/* Foreground wave with elegant curves */}
            <path
              d="M-200,950 Q0,820 300,860 Q600,900 900,840 Q1200,780 1500,820 Q1700,840 1900,830 Q2100,820 2400,810 L2400,1200 L-200,1200 Z"
              fill="url(#fluidWave3)"
            />
            
            {/* Additional seamless wave for depth */}
            <path
              d="M-200,1000 Q150,880 450,920 Q750,960 1050,900 Q1350,840 1650,880 Q1850,900 2050,890 Q2250,880 2400,870 L2400,1200 L-200,1200 Z"
              fill="url(#fluidWave2)"
              opacity="0.8"
            />
            
            {/* Flowing light streaks - continuous across frame */}
            <path
              d="M-100,700 Q200,550 500,590 Q800,630 1100,570 Q1400,510 1700,550 Q1900,570 2100,560 Q2300,550 2500,540"
              stroke="url(#lightStreak)"
              strokeWidth="2.5"
              fill="none"
              opacity="0.6"
              filter="url(#glow)"
            />
            
            <path
              d="M0,750 Q300,600 600,640 Q900,680 1200,620 Q1500,560 1800,600 Q2000,620 2200,610 Q2400,600 2600,590"
              stroke="url(#lightStreak)"
              strokeWidth="1.8"
              fill="none"
              opacity="0.5"
              filter="url(#glow)"
            />
            
            <path
              d="M-50,800 Q250,650 550,690 Q850,730 1150,670 Q1450,610 1750,650 Q1950,670 2150,660 Q2350,650 2550,640"
              stroke="url(#lightStreak)"
              strokeWidth="1.2"
              fill="none"
              opacity="0.4"
            />
            
            {/* Subtle highlight curves for elegance */}
            <path
              d="M-100,650 Q400,520 800,560 Q1200,600 1600,540 Q1800,520 2000,530 Q2200,540 2500,530"
              stroke="url(#lightStreak)"
              strokeWidth="0.8"
              fill="none"
              opacity="0.3"
            />
            
            <path
              d="M100,680 Q500,550 900,590 Q1300,630 1700,570 Q1900,550 2100,560 Q2300,570 2600,560"
              stroke="url(#lightStreak)"
              strokeWidth="0.6"
              fill="none"
              opacity="0.25"
            />
            
            {/* Glowing highlights for premium luxury feel */}
            <ellipse cx="600" cy="600" rx="300" ry="200" fill="url(#neonCore)" opacity="0.4" />
            <ellipse cx="1200" cy="700" rx="250" ry="180" fill="url(#neonGlow)" opacity="0.35" />
            <ellipse cx="1500" cy="500" rx="200" ry="140" fill="url(#neonCore)" opacity="0.3" />
            <ellipse cx="300" cy="750" rx="180" ry="120" fill="url(#neonGlow)" opacity="0.25" />
            
            {/* Additional flowing elements for cinematic depth */}
            <path
              d="M-200,600 Q600,450 1200,490 Q1800,530 2400,470"
              stroke="url(#lightStreak)"
              strokeWidth="0.4"
              fill="none"
              opacity="0.2"
            />
            
            <path
              d="M200,620 Q800,470 1400,510 Q2000,550 2600,490"
              stroke="url(#lightStreak)"
              strokeWidth="0.3"
              fill="none"
              opacity="0.15"
            />
          </svg>
          
          {/* Cinematic overlay for ultra-premium finish */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" 
            style={{ 
              backdropFilter: 'blur(0.3px)',
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.05) 100%)'
            }}
          ></div>
        </div>

        {/* Logo overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            {/* V Logo */}
            <div className="relative">
              <svg
                width="120"
                height="120"
                viewBox="0 0 100 100"
                className="drop-shadow-2xl"
              >
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#60a5fa' }} />
                    <stop offset="50%" style={{ stopColor: '#3b82f6' }} />
                    <stop offset="100%" style={{ stopColor: '#2563eb' }} />
                  </linearGradient>
                </defs>
                {/* Left part of V */}
                <path
                  d="M15,20 L45,80 L35,80 L10,30 Z"
                  fill="url(#logoGradient)"
                  transform="skewX(-5)"
                />
                {/* Right part of V */}
                <path
                  d="M55,20 L85,30 L60,80 L50,80 Z"
                  fill="url(#logoGradient)"
                  transform="skewX(5)"
                />
                {/* Glow effect */}
                <path
                  d="M15,20 L45,80 L35,80 L10,30 Z"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="1"
                  opacity="0.6"
                  transform="skewX(-5)"
                />
                <path
                  d="M55,20 L85,30 L60,80 L50,80 Z"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="1"
                  opacity="0.6"
                  transform="skewX(5)"
                />
              </svg>
            </div>
            <p className="text-sm text-blue-200/60 font-light tracking-wider mt-4">AI Business Intelligence</p>
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5"></div>
      </motion.div>
    </div>
  );
}