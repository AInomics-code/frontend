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
        {/* Full-Screen Abstract Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Pure black backdrop for high contrast */}
          <div className="absolute inset-0 bg-black"></div>
          
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1920 1080"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            style={{ filter: 'contrast(1.3) saturate(1.2) brightness(1.1)' }}
          >
            <defs>
              {/* High contrast abstract gradients */}
              <radialGradient id="royalBlueCore" cx="30%" cy="40%">
                <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 1.0 }} />
                <stop offset="25%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.9 }} />
                <stop offset="50%" style={{ stopColor: '#1e293b', stopOpacity: 0.7 }} />
                <stop offset="75%" style={{ stopColor: '#0f172a', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0.1 }} />
              </radialGradient>
              
              <radialGradient id="electricBlueCore" cx="70%" cy="60%">
                <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1.0 }} />
                <stop offset="20%" style={{ stopColor: '#3b82f6', stopOpacity: 0.9 }} />
                <stop offset="45%" style={{ stopColor: '#1e40af', stopOpacity: 0.7 }} />
                <stop offset="70%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0.1 }} />
              </radialGradient>
              
              <radialGradient id="neonBlueGlow" cx="50%" cy="50%">
                <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 0.95 }} />
                <stop offset="30%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                <stop offset="60%" style={{ stopColor: '#1e40af', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0.0 }} />
              </radialGradient>

              <linearGradient id="flowingCurve1" x1="0%" y1="30%" x2="100%" y2="70%">
                <stop offset="0%" style={{ stopColor: '#000000', stopOpacity: 1.0 }} />
                <stop offset="20%" style={{ stopColor: '#0f172a', stopOpacity: 0.95 }} />
                <stop offset="40%" style={{ stopColor: '#1e293b', stopOpacity: 0.85 }} />
                <stop offset="60%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.75 }} />
                <stop offset="80%" style={{ stopColor: '#1e40af', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
              </linearGradient>
              
              <linearGradient id="flowingCurve2" x1="10%" y1="20%" x2="90%" y2="80%">
                <stop offset="0%" style={{ stopColor: '#0f172a', stopOpacity: 0.98 }} />
                <stop offset="25%" style={{ stopColor: '#1e293b', stopOpacity: 0.9 }} />
                <stop offset="50%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.8 }} />
                <stop offset="75%" style={{ stopColor: '#1e40af', stopOpacity: 0.65 }} />
                <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.45 }} />
              </linearGradient>
              
              <linearGradient id="flowingCurve3" x1="20%" y1="25%" x2="80%" y2="75%">
                <stop offset="0%" style={{ stopColor: '#1e293b', stopOpacity: 0.95 }} />
                <stop offset="30%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.85 }} />
                <stop offset="60%" style={{ stopColor: '#1e40af', stopOpacity: 0.7 }} />
                <stop offset="85%" style={{ stopColor: '#3b82f6', stopOpacity: 0.55 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.35 }} />
              </linearGradient>
              
              <linearGradient id="flowingCurve4" x1="30%" y1="15%" x2="70%" y2="85%">
                <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 0.9 }} />
                <stop offset="35%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                <stop offset="65%" style={{ stopColor: '#60a5fa', stopOpacity: 0.65 }} />
                <stop offset="90%" style={{ stopColor: '#93c5fd', stopOpacity: 0.45 }} />
                <stop offset="100%" style={{ stopColor: '#dbeafe', stopOpacity: 0.25 }} />
              </linearGradient>

              <linearGradient id="neonEdge" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1.0 }} />
                <stop offset="30%" style={{ stopColor: '#3b82f6', stopOpacity: 0.9 }} />
                <stop offset="60%" style={{ stopColor: '#60a5fa', stopOpacity: 0.7 }} />
                <stop offset="85%" style={{ stopColor: '#93c5fd', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#dbeafe', stopOpacity: 0.3 }} />
              </linearGradient>
              
              {/* High contrast neon lighting filters */}
              <filter id="softNeonGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="neonBlur"/>
                <feMerge> 
                  <feMergeNode in="neonBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <filter id="intensiveGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="8" result="intensiveBlur"/>
                <feMerge> 
                  <feMergeNode in="intensiveBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <filter id="edgeGlow" x="-75%" y="-75%" width="250%" height="250%">
                <feGaussianBlur stdDeviation="3" result="edgeBlur"/>
                <feMerge> 
                  <feMergeNode in="edgeBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Deep ambient lighting foundation */}
            <ellipse cx="600" cy="350" rx="1000" ry="600" fill="url(#royalBlueCore)" />
            <ellipse cx="1320" cy="700" rx="800" ry="500" fill="url(#electricBlueCore)" />
            <ellipse cx="960" cy="540" rx="600" ry="400" fill="url(#neonBlueGlow)" />
            
            {/* Abstract flowing wave layers with perfect symmetry */}
            
            {/* Deep background curve layer */}
            <path
              d="M-200,650 Q300,400 600,500 Q900,600 1200,450 Q1500,300 1800,400 Q2000,450 2200,420 L2200,1200 L-200,1200 Z"
              fill="url(#flowingCurve1)"
            />
            
            {/* Mid-depth flowing curve */}
            <path
              d="M-200,750 Q250,500 550,600 Q850,700 1150,550 Q1450,400 1750,500 Q1950,550 2200,520 L2200,1200 L-200,1200 Z"
              fill="url(#flowingCurve2)"
            />
            
            {/* Symmetrical foreground curve */}
            <path
              d="M-200,850 Q200,600 500,700 Q800,800 1100,650 Q1400,500 1700,600 Q1900,650 2200,620 L2200,1200 L-200,1200 Z"
              fill="url(#flowingCurve3)"
            />
            
            {/* Premium top curve layer */}
            <path
              d="M-200,950 Q150,700 450,800 Q750,900 1050,750 Q1350,600 1650,700 Q1850,750 2200,720 L2200,1200 L-200,1200 Z"
              fill="url(#flowingCurve4)"
            />
            
            {/* Additional symmetrical depth */}
            <path
              d="M-200,1050 Q100,800 400,900 Q700,1000 1000,850 Q1300,700 1600,800 Q1800,850 2200,820 L2200,1200 L-200,1200 Z"
              fill="url(#flowingCurve2)"
              opacity="0.8"
            />
            
            {/* Soft neon edge lighting for 3D effect */}
            <path
              d="M-200,600 Q350,350 650,450 Q950,550 1250,400 Q1550,250 1850,350 Q2050,400 2200,370"
              stroke="url(#neonEdge)"
              strokeWidth="3"
              fill="none"
              opacity="0.8"
              filter="url(#softNeonGlow)"
            />
            
            <path
              d="M-200,700 Q300,450 600,550 Q900,650 1200,500 Q1500,350 1800,450 Q2000,500 2200,470"
              stroke="url(#neonEdge)"
              strokeWidth="2.5"
              fill="none"
              opacity="0.7"
              filter="url(#edgeGlow)"
            />
            
            <path
              d="M-200,800 Q250,550 550,650 Q850,750 1150,600 Q1450,450 1750,550 Q1950,600 2200,570"
              stroke="url(#neonEdge)"
              strokeWidth="2"
              fill="none"
              opacity="0.65"
              filter="url(#edgeGlow)"
            />
            
            <path
              d="M-200,900 Q200,650 500,750 Q800,850 1100,700 Q1400,550 1700,650 Q1900,700 2200,670"
              stroke="url(#neonEdge)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />
            
            {/* Glowing highlights for premium 3D depth */}
            <ellipse cx="400" cy="550" rx="250" ry="150" fill="url(#royalBlueCore)" opacity="0.5" filter="url(#intensiveGlow)" />
            <ellipse cx="1000" cy="650" rx="300" ry="180" fill="url(#electricBlueCore)" opacity="0.45" filter="url(#intensiveGlow)" />
            <ellipse cx="1600" cy="500" rx="220" ry="130" fill="url(#neonBlueGlow)" opacity="0.4" filter="url(#softNeonGlow)" />
            <ellipse cx="700" cy="750" rx="180" ry="110" fill="url(#electricBlueCore)" opacity="0.35" filter="url(#edgeGlow)" />
            <ellipse cx="1300" cy="600" rx="200" ry="120" fill="url(#royalBlueCore)" opacity="0.38" filter="url(#edgeGlow)" />
            
            {/* Additional symmetrical flowing elements */}
            <path
              d="M-200,550 Q400,300 700,400 Q1000,500 1300,350 Q1600,200 1900,300 Q2100,350 2200,320"
              stroke="url(#neonEdge)"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
            
            <path
              d="M-100,650 Q450,400 750,500 Q1050,600 1350,450 Q1650,300 1950,400 Q2150,450 2200,420"
              stroke="url(#neonEdge)"
              strokeWidth="0.8"
              fill="none"
              opacity="0.35"
            />
            
            <path
              d="M-150,750 Q350,500 650,600 Q950,700 1250,550 Q1550,400 1850,500 Q2050,550 2200,520"
              stroke="url(#neonEdge)"
              strokeWidth="0.6"
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