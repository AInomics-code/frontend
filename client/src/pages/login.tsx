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
        {/* High-Resolution Enterprise Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Deep dark mode base with enterprise gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0a0f1c] via-[#0f1421] to-[#1a1a2e]"></div>
          
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 2560 1440"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            style={{ filter: 'contrast(1.1) saturate(1.05)' }}
          >
            <defs>
              {/* Enterprise-grade sfumatura gradients */}
              <radialGradient id="enterpriseGlow1" cx="40%" cy="30%">
                <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 0.9 }} />
                <stop offset="20%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.75 }} />
                <stop offset="45%" style={{ stopColor: '#1e293b', stopOpacity: 0.5 }} />
                <stop offset="70%" style={{ stopColor: '#0f172a', stopOpacity: 0.25 }} />
                <stop offset="90%" style={{ stopColor: '#000000', stopOpacity: 0.1 }} />
                <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
              </radialGradient>
              
              <radialGradient id="enterpriseGlow2" cx="70%" cy="60%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                <stop offset="25%" style={{ stopColor: '#1e40af', stopOpacity: 0.65 }} />
                <stop offset="50%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.4 }} />
                <stop offset="75%" style={{ stopColor: '#0f172a', stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
              </radialGradient>
              
              <radialGradient id="electricBlueCore" cx="60%" cy="40%">
                <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.7 }} />
                <stop offset="30%" style={{ stopColor: '#3b82f6', stopOpacity: 0.55 }} />
                <stop offset="60%" style={{ stopColor: '#1e40af', stopOpacity: 0.35 }} />
                <stop offset="85%" style={{ stopColor: '#1e293b', stopOpacity: 0.15 }} />
                <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
              </radialGradient>

              <linearGradient id="luminousWave1" x1="0%" y1="25%" x2="100%" y2="75%">
                <stop offset="0%" style={{ stopColor: '#000000', stopOpacity: 0.95 }} />
                <stop offset="15%" style={{ stopColor: '#0f172a', stopOpacity: 0.85 }} />
                <stop offset="35%" style={{ stopColor: '#1e293b', stopOpacity: 0.7 }} />
                <stop offset="55%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.6 }} />
                <stop offset="75%" style={{ stopColor: '#1e40af', stopOpacity: 0.45 }} />
                <stop offset="90%" style={{ stopColor: '#3b82f6', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.2 }} />
              </linearGradient>
              
              <linearGradient id="luminousWave2" x1="15%" y1="5%" x2="85%" y2="95%">
                <stop offset="0%" style={{ stopColor: '#0f172a', stopOpacity: 0.9 }} />
                <stop offset="25%" style={{ stopColor: '#1e293b', stopOpacity: 0.75 }} />
                <stop offset="50%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.6 }} />
                <stop offset="75%" style={{ stopColor: '#1e40af', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.35 }} />
              </linearGradient>
              
              <linearGradient id="luminousWave3" x1="30%" y1="15%" x2="70%" y2="85%">
                <stop offset="0%" style={{ stopColor: '#1e293b', stopOpacity: 0.8 }} />
                <stop offset="30%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.65 }} />
                <stop offset="60%" style={{ stopColor: '#1e40af', stopOpacity: 0.5 }} />
                <stop offset="85%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.25 }} />
              </linearGradient>
              
              <linearGradient id="luminousWave4" x1="45%" y1="25%" x2="55%" y2="75%">
                <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 0.7 }} />
                <stop offset="40%" style={{ stopColor: '#3b82f6', stopOpacity: 0.55 }} />
                <stop offset="70%" style={{ stopColor: '#60a5fa', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#93c5fd', stopOpacity: 0.25 }} />
              </linearGradient>

              <linearGradient id="glowingEdge" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.8 }} />
                <stop offset="30%" style={{ stopColor: '#3b82f6', stopOpacity: 0.6 }} />
                <stop offset="70%" style={{ stopColor: '#60a5fa', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#93c5fd', stopOpacity: 0.2 }} />
              </linearGradient>
              
              {/* Advanced glow filters for luminous effects */}
              <filter id="subtleGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <filter id="enterpriseGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="softGlow"/>
                <feMerge> 
                  <feMergeNode in="softGlow"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Enterprise ambient lighting foundation */}
            <ellipse cx="1000" cy="400" rx="1400" ry="800" fill="url(#enterpriseGlow1)" />
            <ellipse cx="1800" cy="900" rx="1200" ry="700" fill="url(#enterpriseGlow2)" />
            <ellipse cx="600" cy="600" rx="900" ry="600" fill="url(#electricBlueCore)" />
            
            {/* Elegant flowing wave layers with sfumatura blending */}
            
            {/* Deep background wave layer */}
            <path
              d="M-300,600 Q200,350 600,450 Q1000,550 1400,400 Q1800,250 2200,300 Q2400,325 2600,315 Q2800,305 3000,295 L3000,1600 L-300,1600 Z"
              fill="url(#luminousWave1)"
            />
            
            {/* Mid-depth flowing wave */}
            <path
              d="M-300,750 Q100,500 500,600 Q900,700 1300,550 Q1700,400 2100,450 Q2300,475 2500,465 Q2700,455 3000,445 L3000,1600 L-300,1600 Z"
              fill="url(#luminousWave2)"
            />
            
            {/* Enterprise foreground wave */}
            <path
              d="M-300,900 Q0,650 400,750 Q800,850 1200,700 Q1600,550 2000,600 Q2200,625 2400,615 Q2600,605 3000,595 L3000,1600 L-300,1600 Z"
              fill="url(#luminousWave3)"
            />
            
            {/* Luminous top layer */}
            <path
              d="M-300,1050 Q150,800 550,900 Q950,1000 1350,850 Q1750,700 2150,750 Q2350,775 2550,765 Q2750,755 3000,745 L3000,1600 L-300,1600 Z"
              fill="url(#luminousWave4)"
            />
            
            {/* Additional depth layer for richness */}
            <path
              d="M-300,1200 Q300,950 700,1050 Q1100,1150 1500,1000 Q1900,850 2300,900 Q2500,925 2700,915 Q2900,905 3000,895 L3000,1600 L-300,1600 Z"
              fill="url(#luminousWave2)"
              opacity="0.75"
            />
            
            {/* Glowing edge highlights for luminous effect */}
            <path
              d="M-300,550 Q250,300 650,400 Q1050,500 1450,350 Q1850,200 2250,250 Q2450,275 2650,265 Q2850,255 3000,245"
              stroke="url(#glowingEdge)"
              strokeWidth="2"
              fill="none"
              opacity="0.5"
              filter="url(#subtileGlow)"
            />
            
            <path
              d="M-300,700 Q150,450 550,550 Q950,650 1350,500 Q1750,350 2150,400 Q2350,425 2550,415 Q2750,405 3000,395"
              stroke="url(#glowingEdge)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.4"
              filter="url(#subtleGlow)"
            />
            
            <path
              d="M-300,850 Q50,600 450,700 Q850,800 1250,650 Q1650,500 2050,550 Q2250,575 2450,565 Q2650,555 3000,545"
              stroke="url(#glowingEdge)"
              strokeWidth="1"
              fill="none"
              opacity="0.35"
            />
            
            {/* Enterprise-grade luminous accents */}
            <ellipse cx="500" cy="600" rx="300" ry="200" fill="url(#enterpriseGlow1)" opacity="0.4" filter="url(#enterpriseGlow)" />
            <ellipse cx="1300" cy="750" rx="350" ry="250" fill="url(#electricBlueCore)" opacity="0.35" filter="url(#enterpriseGlow)" />
            <ellipse cx="2000" cy="600" rx="280" ry="180" fill="url(#enterpriseGlow2)" opacity="0.3" filter="url(#enterpriseGlow)" />
            <ellipse cx="800" cy="900" rx="200" ry="140" fill="url(#electricBlueCore)" opacity="0.25" filter="url(#subtleGlow)" />
            <ellipse cx="1600" cy="500" rx="220" ry="160" fill="url(#enterpriseGlow1)" opacity="0.28" filter="url(#subtleGlow)" />
            
            {/* Additional subtle flowing elements for depth */}
            <path
              d="M-300,500 Q500,250 1000,350 Q1500,450 2000,300 Q2200,250 2400,275 Q2600,300 3000,275"
              stroke="url(#glowingEdge)"
              strokeWidth="0.8"
              fill="none"
              opacity="0.25"
            />
            
            <path
              d="M-100,650 Q700,400 1200,500 Q1700,600 2200,450 Q2400,400 2600,425 Q2800,450 3000,425"
              stroke="url(#glowingEdge)"
              strokeWidth="0.6"
              fill="none"
              opacity="0.2"
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