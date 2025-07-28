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
        {/* High-Resolution Abstract Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Deep black gradient backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>
          
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 2560 1440"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            style={{ filter: 'contrast(1.4) saturate(1.3) brightness(1.15)' }}
          >
            <defs>
              {/* Realistic sfumatura gradients from dark navy to bright blue */}
              <radialGradient id="deepNavyCore" cx="25%" cy="35%">
                <stop offset="0%" style={{ stopColor: '#0c4a6e', stopOpacity: 1.0 }} />
                <stop offset="15%" style={{ stopColor: '#0e7490', stopOpacity: 0.95 }} />
                <stop offset="35%" style={{ stopColor: '#0284c7', stopOpacity: 0.85 }} />
                <stop offset="55%" style={{ stopColor: '#0369a1', stopOpacity: 0.7 }} />
                <stop offset="75%" style={{ stopColor: '#1e40af', stopOpacity: 0.5 }} />
                <stop offset="90%" style={{ stopColor: '#1e293b', stopOpacity: 0.25 }} />
                <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0.05 }} />
              </radialGradient>
              
              <radialGradient id="electricBlueCore" cx="75%" cy="65%">
                <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1.0 }} />
                <stop offset="12%" style={{ stopColor: '#0284c7', stopOpacity: 0.95 }} />
                <stop offset="28%" style={{ stopColor: '#0369a1', stopOpacity: 0.88 }} />
                <stop offset="45%" style={{ stopColor: '#1e40af', stopOpacity: 0.75 }} />
                <stop offset="65%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.55 }} />
                <stop offset="82%" style={{ stopColor: '#1e293b', stopOpacity: 0.35 }} />
                <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0.1 }} />
              </radialGradient>
              
              <radialGradient id="brightBlueHighlight" cx="50%" cy="45%">
                <stop offset="0%" style={{ stopColor: '#38bdf8', stopOpacity: 0.98 }} />
                <stop offset="18%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.9 }} />
                <stop offset="38%" style={{ stopColor: '#0284c7', stopOpacity: 0.8 }} />
                <stop offset="58%" style={{ stopColor: '#0369a1', stopOpacity: 0.65 }} />
                <stop offset="78%" style={{ stopColor: '#1e40af', stopOpacity: 0.45 }} />
                <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0.0 }} />
              </radialGradient>

              <linearGradient id="fluidWave1" x1="0%" y1="25%" x2="100%" y2="75%">
                <stop offset="0%" style={{ stopColor: '#000000', stopOpacity: 1.0 }} />
                <stop offset="12%" style={{ stopColor: '#0c1726', stopOpacity: 0.98 }} />
                <stop offset="28%" style={{ stopColor: '#1e293b', stopOpacity: 0.92 }} />
                <stop offset="45%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.85 }} />
                <stop offset="62%" style={{ stopColor: '#1e40af', stopOpacity: 0.75 }} />
                <stop offset="78%" style={{ stopColor: '#0369a1', stopOpacity: 0.6 }} />
                <stop offset="90%" style={{ stopColor: '#0284c7', stopOpacity: 0.45 }} />
                <stop offset="100%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.3 }} />
              </linearGradient>
              
              <linearGradient id="fluidWave2" x1="8%" y1="18%" x2="92%" y2="82%">
                <stop offset="0%" style={{ stopColor: '#0c1726', stopOpacity: 0.99 }} />
                <stop offset="15%" style={{ stopColor: '#1e293b', stopOpacity: 0.95 }} />
                <stop offset="32%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.88 }} />
                <stop offset="50%" style={{ stopColor: '#1e40af', stopOpacity: 0.8 }} />
                <stop offset="68%" style={{ stopColor: '#0369a1', stopOpacity: 0.68 }} />
                <stop offset="84%" style={{ stopColor: '#0284c7', stopOpacity: 0.52 }} />
                <stop offset="100%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.35 }} />
              </linearGradient>
              
              <linearGradient id="fluidWave3" x1="15%" y1="22%" x2="85%" y2="78%">
                <stop offset="0%" style={{ stopColor: '#1e293b', stopOpacity: 0.97 }} />
                <stop offset="18%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.92 }} />
                <stop offset="36%" style={{ stopColor: '#1e40af', stopOpacity: 0.85 }} />
                <stop offset="55%" style={{ stopColor: '#0369a1', stopOpacity: 0.75 }} />
                <stop offset="72%" style={{ stopColor: '#0284c7', stopOpacity: 0.62 }} />
                <stop offset="88%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.45 }} />
                <stop offset="100%" style={{ stopColor: '#38bdf8', stopOpacity: 0.28 }} />
              </linearGradient>
              
              <linearGradient id="fluidWave4" x1="25%" y1="12%" x2="75%" y2="88%">
                <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 0.95 }} />
                <stop offset="22%" style={{ stopColor: '#0369a1', stopOpacity: 0.88 }} />
                <stop offset="42%" style={{ stopColor: '#0284c7', stopOpacity: 0.8 }} />
                <stop offset="62%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.7 }} />
                <stop offset="80%" style={{ stopColor: '#38bdf8', stopOpacity: 0.55 }} />
                <stop offset="95%" style={{ stopColor: '#7dd3fc', stopOpacity: 0.38 }} />
                <stop offset="100%" style={{ stopColor: '#bae6fd', stopOpacity: 0.2 }} />
              </linearGradient>

              <linearGradient id="fiberOpticStreak" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1.0 }} />
                <stop offset="15%" style={{ stopColor: '#38bdf8', stopOpacity: 0.95 }} />
                <stop offset="35%" style={{ stopColor: '#7dd3fc', stopOpacity: 0.85 }} />
                <stop offset="55%" style={{ stopColor: '#bae6fd', stopOpacity: 0.7 }} />
                <stop offset="75%" style={{ stopColor: '#e0f2fe', stopOpacity: 0.5 }} />
                <stop offset="90%" style={{ stopColor: '#f0f9ff', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.15 }} />
              </linearGradient>
              
              <linearGradient id="laserTrail" x1="10%" y1="5%" x2="90%" y2="95%">
                <stop offset="0%" style={{ stopColor: '#0284c7', stopOpacity: 0.9 }} />
                <stop offset="25%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.8 }} />
                <stop offset="50%" style={{ stopColor: '#38bdf8', stopOpacity: 0.65 }} />
                <stop offset="75%" style={{ stopColor: '#7dd3fc', stopOpacity: 0.45 }} />
                <stop offset="100%" style={{ stopColor: '#bae6fd', stopOpacity: 0.25 }} />
              </linearGradient>
              
              {/* Advanced 3D depth and glow filters */}
              <filter id="softDepthGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="softDepth"/>
                <feMerge> 
                  <feMergeNode in="softDepth"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <filter id="electricGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="10" result="electricBlur"/>
                <feMerge> 
                  <feMergeNode in="electricBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <filter id="fiberOpticGlow" x="-75%" y="-75%" width="250%" height="250%">
                <feGaussianBlur stdDeviation="4" result="fiberBlur"/>
                <feMerge> 
                  <feMergeNode in="fiberBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <filter id="laserGlow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="2.5" result="laserBlur"/>
                <feMerge> 
                  <feMergeNode in="laserBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Deep ambient foundation with realistic gradients */}
            <ellipse cx="640" cy="450" rx="1400" ry="800" fill="url(#deepNavyCore)" />
            <ellipse cx="1920" cy="900" rx="1200" ry="700" fill="url(#electricBlueCore)" />
            <ellipse cx="1280" cy="720" rx="900" ry="550" fill="url(#brightBlueHighlight)" />
            
            {/* Elegant flowing neon waves with soft curvature */}
            
            {/* Deep background wave with realistic sfumatura */}
            <path
              d="M-300,800 Q400,500 800,650 Q1200,800 1600,600 Q2000,400 2400,550 Q2600,600 2800,580 L2800,1600 L-300,1600 Z"
              fill="url(#fluidWave1)"
            />
            
            {/* Mid-depth flowing wave with 3D layering */}
            <path
              d="M-300,950 Q350,650 750,800 Q1150,950 1550,750 Q1950,550 2350,700 Q2550,750 2800,730 L2800,1600 L-300,1600 Z"
              fill="url(#fluidWave2)"
            />
            
            {/* Foreground wave with electric highlights */}
            <path
              d="M-300,1100 Q300,800 700,950 Q1100,1100 1500,900 Q1900,700 2300,850 Q2500,900 2800,880 L2800,1600 L-300,1600 Z"
              fill="url(#fluidWave3)"
            />
            
            {/* Premium top layer with bright blue highlights */}
            <path
              d="M-300,1250 Q250,950 650,1100 Q1050,1250 1450,1050 Q1850,850 2250,1000 Q2450,1050 2800,1030 L2800,1600 L-300,1600 Z"
              fill="url(#fluidWave4)"
            />
            
            {/* Additional depth layer for realistic 3D effect */}
            <path
              d="M-300,1400 Q200,1100 600,1250 Q1000,1400 1400,1200 Q1800,1000 2200,1150 Q2400,1200 2800,1180 L2800,1600 L-300,1600 Z"
              fill="url(#fluidWave2)"
              opacity="0.75"
            />
            
            {/* Fiber optic light streaks for premium tech effect */}
            <path
              d="M-300,750 Q450,450 850,600 Q1250,750 1650,550 Q2050,350 2450,500 Q2650,550 2800,530"
              stroke="url(#fiberOpticStreak)"
              strokeWidth="4"
              fill="none"
              opacity="0.9"
              filter="url(#electricGlow)"
            />
            
            <path
              d="M-300,900 Q400,600 800,750 Q1200,900 1600,700 Q2000,500 2400,650 Q2600,700 2800,680"
              stroke="url(#fiberOpticStreak)"
              strokeWidth="3.5"
              fill="none"
              opacity="0.85"
              filter="url(#fiberOpticGlow)"
            />
            
            <path
              d="M-300,1050 Q350,750 750,900 Q1150,1050 1550,850 Q1950,650 2350,800 Q2550,850 2800,830"
              stroke="url(#laserTrail)"
              strokeWidth="3"
              fill="none"
              opacity="0.8"
              filter="url(#fiberOpticGlow)"
            />
            
            <path
              d="M-300,1200 Q300,900 700,1050 Q1100,1200 1500,1000 Q1900,800 2300,950 Q2500,1000 2800,980"
              stroke="url(#laserTrail)"
              strokeWidth="2.5"
              fill="none"
              opacity="0.75"
              filter="url(#laserGlow)"
            />
            
            {/* Fine luminous line textures inside waves */}
            <path
              d="M-200,820 Q500,520 900,670 Q1300,820 1700,620 Q2100,420 2500,570 Q2700,620 2800,600"
              stroke="url(#fiberOpticStreak)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
              filter="url(#laserGlow)"
            />
            
            <path
              d="M-150,970 Q450,670 850,820 Q1250,970 1650,770 Q2050,570 2450,720 Q2650,770 2800,750"
              stroke="url(#laserTrail)"
              strokeWidth="1.2"
              fill="none"
              opacity="0.55"
            />
            
            <path
              d="M-100,1120 Q400,820 800,970 Q1200,1120 1600,920 Q2000,720 2400,870 Q2600,920 2800,900"
              stroke="url(#fiberOpticStreak)"
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />
            
            <path
              d="M-50,1270 Q350,970 750,1120 Q1150,1270 1550,1070 Q1950,870 2350,1020 Q2550,1070 2800,1050"
              stroke="url(#laserTrail)"
              strokeWidth="0.8"
              fill="none"
              opacity="0.45"
            />
            
            {/* Electric-blue glowing highlights for 3D depth */}
            <ellipse cx="600" cy="650" rx="320" ry="200" fill="url(#deepNavyCore)" opacity="0.6" filter="url(#electricGlow)" />
            <ellipse cx="1280" cy="800" rx="380" ry="240" fill="url(#electricBlueCore)" opacity="0.55" filter="url(#electricGlow)" />
            <ellipse cx="1920" cy="650" rx="280" ry="180" fill="url(#brightBlueHighlight)" opacity="0.5" filter="url(#softDepthGlow)" />
            <ellipse cx="960" cy="950" rx="240" ry="150" fill="url(#electricBlueCore)" opacity="0.45" filter="url(#fiberOpticGlow)" />
            <ellipse cx="1600" cy="750" rx="260" ry="160" fill="url(#deepNavyCore)" opacity="0.48" filter="url(#fiberOpticGlow)" />
            
            {/* Additional fiber optic details for premium finish */}
            <path
              d="M-300,700 Q550,400 950,550 Q1350,700 1750,500 Q2150,300 2550,450 Q2750,500 2800,480"
              stroke="url(#fiberOpticStreak)"
              strokeWidth="0.6"
              fill="none"
              opacity="0.4"
            />
            
            <path
              d="M-250,850 Q500,550 900,700 Q1300,850 1700,650 Q2100,450 2500,600 Q2700,650 2800,630"
              stroke="url(#laserTrail)"
              strokeWidth="0.5"
              fill="none"
              opacity="0.35"
            />
            
            <path
              d="M-200,1000 Q450,700 850,850 Q1250,1000 1650,800 Q2050,600 2450,750 Q2650,800 2800,780"
              stroke="url(#fiberOpticStreak)"
              strokeWidth="0.4"
              fill="none"
              opacity="0.3"
            />
          </svg>
          
          {/* Enterprise finish overlay for polished look */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" 
            style={{ 
              backdropFilter: 'blur(0.2px)',
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.03) 100%)'
            }}
          ></div>
        </div>

        

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5"></div>
      </motion.div>
    </div>
  );
}