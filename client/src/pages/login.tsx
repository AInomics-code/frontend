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
        {/* Portrait Luxurious Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Deep dark mode base with luxurious gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#0a0f1c] via-[#0f1421] via-[#1a1a2e] to-[#0a0f1c]"></div>
          
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1080 1920"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            style={{ filter: 'contrast(1.15) saturate(1.1) brightness(1.05)' }}
          >
            <defs>
              {/* Luxurious sfumato gradients for portrait mode */}
              <radialGradient id="luxuryGlow1" cx="50%" cy="25%">
                <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 0.95 }} />
                <stop offset="15%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.8 }} />
                <stop offset="35%" style={{ stopColor: '#1e293b', stopOpacity: 0.6 }} />
                <stop offset="60%" style={{ stopColor: '#0f172a', stopOpacity: 0.35 }} />
                <stop offset="80%" style={{ stopColor: '#000000', stopOpacity: 0.15 }} />
                <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
              </radialGradient>
              
              <radialGradient id="luxuryGlow2" cx="30%" cy="70%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.9 }} />
                <stop offset="20%" style={{ stopColor: '#1e40af', stopOpacity: 0.75 }} />
                <stop offset="45%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.5 }} />
                <stop offset="70%" style={{ stopColor: '#0f172a', stopOpacity: 0.25 }} />
                <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
              </radialGradient>
              
              <radialGradient id="electricCore" cx="70%" cy="50%">
                <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.85 }} />
                <stop offset="25%" style={{ stopColor: '#3b82f6', stopOpacity: 0.7 }} />
                <stop offset="55%" style={{ stopColor: '#1e40af', stopOpacity: 0.45 }} />
                <stop offset="80%" style={{ stopColor: '#1e293b', stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
              </radialGradient>

              <linearGradient id="glassyWave1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#000000', stopOpacity: 0.98 }} />
                <stop offset="12%" style={{ stopColor: '#0f172a', stopOpacity: 0.9 }} />
                <stop offset="28%" style={{ stopColor: '#1e293b', stopOpacity: 0.8 }} />
                <stop offset="45%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.7 }} />
                <stop offset="65%" style={{ stopColor: '#1e40af', stopOpacity: 0.55 }} />
                <stop offset="82%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
                <stop offset="95%" style={{ stopColor: '#60a5fa', stopOpacity: 0.25 }} />
                <stop offset="100%" style={{ stopColor: '#93c5fd', stopOpacity: 0.15 }} />
              </linearGradient>
              
              <linearGradient id="glassyWave2" x1="10%" y1="10%" x2="90%" y2="90%">
                <stop offset="0%" style={{ stopColor: '#0f172a', stopOpacity: 0.95 }} />
                <stop offset="18%" style={{ stopColor: '#1e293b', stopOpacity: 0.85 }} />
                <stop offset="38%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.7 }} />
                <stop offset="60%" style={{ stopColor: '#1e40af', stopOpacity: 0.6 }} />
                <stop offset="80%" style={{ stopColor: '#3b82f6', stopOpacity: 0.45 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.3 }} />
              </linearGradient>
              
              <linearGradient id="glassyWave3" x1="20%" y1="15%" x2="80%" y2="85%">
                <stop offset="0%" style={{ stopColor: '#1e293b', stopOpacity: 0.9 }} />
                <stop offset="25%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.8 }} />
                <stop offset="50%" style={{ stopColor: '#1e40af', stopOpacity: 0.65 }} />
                <stop offset="75%" style={{ stopColor: '#3b82f6', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.35 }} />
              </linearGradient>
              
              <linearGradient id="glassyWave4" x1="35%" y1="20%" x2="65%" y2="80%">
                <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 0.85 }} />
                <stop offset="30%" style={{ stopColor: '#3b82f6', stopOpacity: 0.7 }} />
                <stop offset="60%" style={{ stopColor: '#60a5fa', stopOpacity: 0.55 }} />
                <stop offset="85%" style={{ stopColor: '#93c5fd', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#dbeafe', stopOpacity: 0.25 }} />
              </linearGradient>
              
              <linearGradient id="glassyWave5" x1="40%" y1="25%" x2="60%" y2="75%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                <stop offset="40%" style={{ stopColor: '#60a5fa', stopOpacity: 0.65 }} />
                <stop offset="70%" style={{ stopColor: '#93c5fd', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#dbeafe', stopOpacity: 0.3 }} />
              </linearGradient>

              <linearGradient id="luxuryReflection" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.9 }} />
                <stop offset="25%" style={{ stopColor: '#3b82f6', stopOpacity: 0.7 }} />
                <stop offset="50%" style={{ stopColor: '#60a5fa', stopOpacity: 0.5 }} />
                <stop offset="75%" style={{ stopColor: '#93c5fd', stopOpacity: 0.35 }} />
                <stop offset="100%" style={{ stopColor: '#dbeafe', stopOpacity: 0.2 }} />
              </linearGradient>
              
              {/* Advanced glass effects and light reflections */}
              <filter id="glassyGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="softBlur"/>
                <feMerge> 
                  <feMergeNode in="softBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <filter id="luxuryBlur" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="5" result="luxuryGlow"/>
                <feMerge> 
                  <feMergeNode in="luxuryGlow"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <filter id="reflectionGlow" x="-75%" y="-75%" width="250%" height="250%">
                <feGaussianBlur stdDeviation="2.5" result="reflection"/>
                <feMerge> 
                  <feMergeNode in="reflection"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Luxurious ambient lighting foundation */}
            <ellipse cx="540" cy="480" rx="700" ry="400" fill="url(#luxuryGlow1)" />
            <ellipse cx="320" cy="1200" rx="600" ry="350" fill="url(#luxuryGlow2)" />
            <ellipse cx="760" cy="960" rx="500" ry="300" fill="url(#electricCore)" />
            
            {/* Portrait glassy wave layers with sfumato blending */}
            
            {/* Deep background glassy layer */}
            <path
              d="M-150,400 Q200,200 400,280 Q600,360 800,240 Q900,200 1000,220 Q1100,240 1230,200 L1230,2000 L-150,2000 Z"
              fill="url(#glassyWave1)"
            />
            
            {/* Mid-depth luxurious wave */}
            <path
              d="M-150,600 Q150,400 350,480 Q550,560 750,440 Q850,400 950,420 Q1050,440 1230,400 L1230,2000 L-150,2000 Z"
              fill="url(#glassyWave2)"
            />
            
            {/* Enterprise foreground wave */}
            <path
              d="M-150,800 Q100,600 300,680 Q500,760 700,640 Q800,600 900,620 Q1000,640 1230,600 L1230,2000 L-150,2000 Z"
              fill="url(#glassyWave3)"
            />
            
            {/* Luminous glassy layer */}
            <path
              d="M-150,1000 Q50,800 250,880 Q450,960 650,840 Q750,800 850,820 Q950,840 1230,800 L1230,2000 L-150,2000 Z"
              fill="url(#glassyWave4)"
            />
            
            {/* Top luxurious layer */}
            <path
              d="M-150,1200 Q0,1000 200,1080 Q400,1160 600,1040 Q700,1000 800,1020 Q900,1040 1230,1000 L1230,2000 L-150,2000 Z"
              fill="url(#glassyWave5)"
            />
            
            {/* Additional depth layer for richness */}
            <path
              d="M-150,1400 Q100,1200 300,1280 Q500,1360 700,1240 Q800,1200 900,1220 Q1000,1240 1230,1200 L1230,2000 L-150,2000 Z"
              fill="url(#glassyWave3)"
              opacity="0.7"
            />
            
            {/* Glassy light reflections for luxurious effect */}
            <path
              d="M-150,350 Q250,150 450,230 Q650,310 850,190 Q950,150 1050,170 Q1150,190 1230,150"
              stroke="url(#luxuryReflection)"
              strokeWidth="2.5"
              fill="none"
              opacity="0.6"
              filter="url(#reflectionGlow)"
            />
            
            <path
              d="M-150,550 Q200,350 400,430 Q600,510 800,390 Q900,350 1000,370 Q1100,390 1230,350"
              stroke="url(#luxuryReflection)"
              strokeWidth="2"
              fill="none"
              opacity="0.5"
              filter="url(#glassyGlow)"
            />
            
            <path
              d="M-150,750 Q150,550 350,630 Q550,710 750,590 Q850,550 950,570 Q1050,590 1230,550"
              stroke="url(#luxuryReflection)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.45"
              filter="url(#glassyGlow)"
            />
            
            <path
              d="M-150,950 Q100,750 300,830 Q500,910 700,790 Q800,750 900,770 Q1000,790 1230,750"
              stroke="url(#luxuryReflection)"
              strokeWidth="1.2"
              fill="none"
              opacity="0.4"
            />
            
            {/* Luxurious glassy accents */}
            <ellipse cx="300" cy="500" rx="180" ry="120" fill="url(#luxuryGlow1)" opacity="0.45" filter="url(#luxuryBlur)" />
            <ellipse cx="700" cy="800" rx="200" ry="140" fill="url(#electricCore)" opacity="0.4" filter="url(#luxuryBlur)" />
            <ellipse cx="500" cy="1100" rx="160" ry="100" fill="url(#luxuryGlow2)" opacity="0.35" filter="url(#glassyGlow)" />
            <ellipse cx="800" cy="600" rx="140" ry="90" fill="url(#electricCore)" opacity="0.3" filter="url(#glassyGlow)" />
            <ellipse cx="400" cy="900" rx="120" ry="80" fill="url(#luxuryGlow1)" opacity="0.32" filter="url(#reflectionGlow)" />
            
            {/* Additional glassy flowing elements for depth */}
            <path
              d="M-150,300 Q300,100 500,180 Q700,260 900,140 Q1000,100 1100,120 Q1200,140 1230,100"
              stroke="url(#luxuryReflection)"
              strokeWidth="0.8"
              fill="none"
              opacity="0.3"
            />
            
            <path
              d="M-50,450 Q350,250 550,330 Q750,410 950,290 Q1050,250 1150,270 Q1250,290 1230,250"
              stroke="url(#luxuryReflection)"
              strokeWidth="0.6"
              fill="none"
              opacity="0.25"
            />
            
            <path
              d="M-100,650 Q250,450 450,530 Q650,610 850,490 Q950,450 1050,470 Q1150,490 1230,450"
              stroke="url(#luxuryReflection)"
              strokeWidth="0.5"
              fill="none"
              opacity="0.22"
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