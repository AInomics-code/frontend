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
        {/* Smooth Curved Layer Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Deep black base */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0a0f1c] to-[#1a1a2e]"></div>
          
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1920 1080"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Smooth curved layer gradients */}
              <radialGradient id="curveGlow1" cx="60%" cy="20%">
                <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 0.8 }} />
                <stop offset="40%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.6 }} />
                <stop offset="80%" style={{ stopColor: '#0f172a', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
              </radialGradient>
              
              <radialGradient id="curveGlow2" cx="30%" cy="70%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.7 }} />
                <stop offset="50%" style={{ stopColor: '#1e40af', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
              </radialGradient>

              <linearGradient id="smoothCurve1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0f172a', stopOpacity: 0.9 }} />
                <stop offset="30%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.7 }} />
                <stop offset="70%" style={{ stopColor: '#1e40af', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.3 }} />
              </linearGradient>
              
              <linearGradient id="smoothCurve2" x1="20%" y1="10%" x2="80%" y2="90%">
                <stop offset="0%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.8 }} />
                <stop offset="50%" style={{ stopColor: '#1e40af', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
              </linearGradient>
              
              <linearGradient id="smoothCurve3" x1="40%" y1="20%" x2="60%" y2="80%">
                <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 0.7 }} />
                <stop offset="60%" style={{ stopColor: '#3b82f6', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.3 }} />
              </linearGradient>

              <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.6 }} />
                <stop offset="50%" style={{ stopColor: '#60a5fa', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#93c5fd', stopOpacity: 0.2 }} />
              </linearGradient>
            </defs>
            
            {/* Ambient base lighting */}
            <ellipse cx="1000" cy="300" rx="1000" ry="600" fill="url(#curveGlow1)" />
            <ellipse cx="600" cy="800" rx="800" ry="500" fill="url(#curveGlow2)" />
            
            {/* Smooth curved layers matching reference */}
            
            {/* Back layer - large curve */}
            <path
              d="M-200,400 Q400,200 800,300 Q1200,400 1600,250 Q1800,200 2000,220 Q2200,240 2400,200 L2400,1200 L-200,1200 Z"
              fill="url(#smoothCurve1)"
            />
            
            {/* Mid layer - flowing curve */}
            <path
              d="M-200,500 Q300,300 700,400 Q1100,500 1500,350 Q1700,300 1900,320 Q2100,340 2400,300 L2400,1200 L-200,1200 Z"
              fill="url(#smoothCurve2)"
            />
            
            {/* Front layer - elegant curve */}
            <path
              d="M-200,600 Q200,400 600,500 Q1000,600 1400,450 Q1600,400 1800,420 Q2000,440 2400,400 L2400,1200 L-200,1200 Z"
              fill="url(#smoothCurve3)"
            />
            
            {/* Additional depth layer */}
            <path
              d="M-200,700 Q100,500 500,600 Q900,700 1300,550 Q1500,500 1700,520 Q1900,540 2400,500 L2400,1200 L-200,1200 Z"
              fill="url(#smoothCurve2)"
              opacity="0.8"
            />
            
            {/* Subtle edge highlights */}
            <path
              d="M-200,350 Q450,150 900,250 Q1350,350 1800,200 Q2000,150 2400,180"
              stroke="url(#edgeGlow)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.4"
            />
            
            <path
              d="M-200,450 Q350,250 800,350 Q1250,450 1700,300 Q1900,250 2400,280"
              stroke="url(#edgeGlow)"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
            
            {/* Soft glow accents */}
            <ellipse cx="400" cy="400" rx="200" ry="150" fill="url(#curveGlow1)" opacity="0.3" />
            <ellipse cx="1200" cy="500" rx="250" ry="180" fill="url(#curveGlow2)" opacity="0.25" />
            <ellipse cx="1600" cy="350" rx="180" ry="120" fill="url(#curveGlow1)" opacity="0.2" />
          </svg>
        </div>

        {/* Logo overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            {/* Modern Avant-garde V Logo */}
            <div className="relative">
              <svg
                width="160"
                height="160"
                viewBox="0 0 240 240"
                className="drop-shadow-2xl"
              >
                <defs>
                  <linearGradient id="avantGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#60a5fa' }} />
                    <stop offset="40%" style={{ stopColor: '#3b82f6' }} />
                    <stop offset="80%" style={{ stopColor: '#1e40af' }} />
                    <stop offset="100%" style={{ stopColor: '#1e3a8a' }} />
                  </linearGradient>
                  
                  <linearGradient id="modernGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#93c5fd', stopOpacity: 0.9 }} />
                    <stop offset="50%" style={{ stopColor: '#60a5fa', stopOpacity: 0.6 }} />
                    <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.3 }} />
                  </linearGradient>

                  <filter id="modernGlowFilter" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  
                  <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="softGlow"/>
                    <feMerge> 
                      <feMergeNode in="softGlow"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Background ambient glow */}
                <ellipse cx="120" cy="120" rx="90" ry="90" fill="url(#modernGlow)" opacity="0.2" filter="url(#modernGlowFilter)" />
                
                {/* Modern V - Left geometric stroke */}
                <path
                  d="M60,70 L120,170 L105,170 L50,80 Q50,70 60,70 Z"
                  fill="url(#avantGradient)"
                  stroke="none"
                />
                
                {/* Modern V - Right geometric stroke */}
                <path
                  d="M180,70 Q190,70 190,80 L135,170 L120,170 L180,70 Z"
                  fill="url(#avantGradient)"
                  stroke="none"
                />
                
                {/* Inner light reflections */}
                <path
                  d="M65,75 L120,165 L110,165 L58,82 Q58,75 65,75 Z"
                  fill="url(#modernGlow)"
                  opacity="0.7"
                  filter="url(#innerGlow)"
                />
                
                <path
                  d="M175,70 Q182,70 182,77 L130,165 L120,165 L175,70 Z"
                  fill="url(#modernGlow)"
                  opacity="0.7"
                  filter="url(#innerGlow)"
                />
                
                {/* Avant-garde edge highlights */}
                <path
                  d="M60,70 L120,170"
                  stroke="url(#modernGlow)"
                  strokeWidth="1.5"
                  opacity="0.8"
                  filter="url(#innerGlow)"
                />
                
                <path
                  d="M180,70 L120,170"
                  stroke="url(#modernGlow)"
                  strokeWidth="1.5"
                  opacity="0.8"
                  filter="url(#innerGlow)"
                />
                
                {/* Modern geometric accents */}
                <circle cx="60" cy="70" r="3" fill="url(#modernGlow)" opacity="0.9" />
                <circle cx="180" cy="70" r="3" fill="url(#modernGlow)" opacity="0.9" />
                <circle cx="120" cy="170" r="4" fill="url(#modernGlow)" opacity="0.8" />
                
                {/* Subtle outer glow effect */}
                <path
                  d="M60,70 L120,170 L180,70"
                  fill="none"
                  stroke="url(#modernGlow)"
                  strokeWidth="0.8"
                  opacity="0.5"
                  filter="url(#modernGlowFilter)"
                />
              </svg>
            </div>
            <p className="text-sm text-blue-200/80 font-light tracking-wider mt-6">AI Business Intelligence</p>
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5"></div>
      </motion.div>
    </div>
  );
}