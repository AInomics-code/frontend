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
        {/* Ultra-Smooth Enterprise Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1400 1000"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'blur(0.5px)' }}
          >
            <defs>
              {/* Ultra-smooth gradient definitions for enterprise aesthetics */}
              <radialGradient id="primaryGlow" cx="40%" cy="30%">
                <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.6 }} />
                <stop offset="25%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
                <stop offset="50%" style={{ stopColor: '#1e40af', stopOpacity: 0.25 }} />
                <stop offset="75%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.15 }} />
                <stop offset="100%" style={{ stopColor: '#0f172a', stopOpacity: 0.05 }} />
              </radialGradient>
              
              <radialGradient id="secondaryGlow" cx="70%" cy="60%">
                <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 0.4 }} />
                <stop offset="40%" style={{ stopColor: '#2563eb', stopOpacity: 0.3 }} />
                <stop offset="80%" style={{ stopColor: '#1e40af', stopOpacity: 0.1 }} />
                <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
              </radialGradient>

              <linearGradient id="wave1" x1="0%" y1="20%" x2="100%" y2="80%">
                <stop offset="0%" style={{ stopColor: '#0f172a', stopOpacity: 0.9 }} />
                <stop offset="20%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.7 }} />
                <stop offset="50%" style={{ stopColor: '#1e40af', stopOpacity: 0.5 }} />
                <stop offset="80%" style={{ stopColor: '#3b82f6', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.15 }} />
              </linearGradient>
              
              <linearGradient id="wave2" x1="10%" y1="0%" x2="90%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.8 }} />
                <stop offset="30%" style={{ stopColor: '#1e40af', stopOpacity: 0.6 }} />
                <stop offset="70%" style={{ stopColor: '#2563eb', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.2 }} />
              </linearGradient>
              
              <linearGradient id="wave3" x1="30%" y1="10%" x2="70%" y2="90%">
                <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 0.6 }} />
                <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.2 }} />
              </linearGradient>

              <linearGradient id="highlightStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.6 }} />
                <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.2 }} />
              </linearGradient>
            </defs>
            
            {/* Ambient lighting base */}
            <ellipse cx="500" cy="300" rx="800" ry="500" fill="url(#primaryGlow)" />
            <ellipse cx="900" cy="600" rx="600" ry="400" fill="url(#secondaryGlow)" />
            
            {/* Layered wave patterns for immersive depth */}
            
            {/* Background wave layer */}
            <path
              d="M0,700 Q200,580 400,620 Q600,660 800,600 Q1000,540 1200,580 Q1300,600 1400,590 L1400,1000 L0,1000 Z"
              fill="url(#wave1)"
            />
            
            {/* Mid-layer waves */}
            <path
              d="M0,750 Q150,630 350,670 Q550,710 750,650 Q950,590 1150,630 Q1250,650 1400,640 L1400,1000 L0,1000 Z"
              fill="url(#wave2)"
            />
            
            <path
              d="M0,800 Q100,700 300,740 Q500,780 700,720 Q900,660 1100,700 Q1200,720 1400,710 L1400,1000 L0,1000 Z"
              fill="url(#wave3)"
            />
            
            {/* Foreground subtle wave */}
            <path
              d="M0,850 Q200,770 400,800 Q600,830 800,790 Q1000,750 1200,780 Q1300,790 1400,785 L1400,1000 L0,1000 Z"
              fill="url(#wave2)"
              opacity="0.7"
            />
            
            {/* Elegant flowing highlight curves */}
            <path
              d="M0,600 Q200,480 400,520 Q600,560 800,500 Q1000,440 1200,480 Q1300,500 1400,490"
              stroke="url(#highlightStroke)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.4"
            />
            
            <path
              d="M100,650 Q300,530 500,570 Q700,610 900,550 Q1100,490 1300,530"
              stroke="url(#highlightStroke)"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
            
            <path
              d="M50,700 Q250,580 450,620 Q650,660 850,600 Q1050,540 1250,580 Q1350,600 1450,590"
              stroke="url(#highlightStroke)"
              strokeWidth="0.8"
              fill="none"
              opacity="0.25"
            />
            
            {/* Silky lighting transitions - soft glows */}
            <ellipse cx="400" cy="500" rx="200" ry="150" fill="url(#primaryGlow)" opacity="0.3" />
            <ellipse cx="800" cy="600" rx="180" ry="120" fill="url(#secondaryGlow)" opacity="0.25" />
            <ellipse cx="1000" cy="450" rx="150" ry="100" fill="url(#primaryGlow)" opacity="0.2" />
            
            {/* Additional depth layers for enterprise feel */}
            <path
              d="M0,550 Q350,430 700,470 Q1050,510 1400,450"
              stroke="url(#highlightStroke)"
              strokeWidth="0.5"
              fill="none"
              opacity="0.2"
            />
            
            <path
              d="M200,580 Q500,460 800,500 Q1100,540 1400,480"
              stroke="url(#highlightStroke)"
              strokeWidth="0.5"
              fill="none"
              opacity="0.15"
            />
          </svg>
          
          {/* Additional blur overlay for ultra-smooth effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a1a]/20" 
            style={{ backdropFilter: 'blur(0.25px)' }}
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