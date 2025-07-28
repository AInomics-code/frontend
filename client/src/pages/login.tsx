import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TEMP: Replace with real auth
    if (email === "test@vorta.ai" && password === "password") {
      setLocation("/chat-clean-top");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] p-4 text-white gap-2">
      {/* LEFT CARD */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-1/2 bg-gradient-to-br from-[#1c2340] to-[#2a3b5c] rounded-3xl flex flex-col justify-center px-8 md:px-12 shadow-2xl border border-blue-500/20"
      >
        <div className="max-w-md w-full mx-auto">
          {/* VORTA Atom Logo */}
          <div className="flex justify-center mb-4">
            <svg width="70" height="70" viewBox="0 0 100 100" className="text-blue-400">
              <defs>
                <radialGradient id="atomBlue" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
                  <stop offset="60%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 0.3 }} />
                </radialGradient>
              </defs>
              
              {/* First orbital ring */}
              <ellipse cx="50" cy="50" rx="35" ry="15" 
                fill="none" stroke="url(#atomBlue)" strokeWidth="8" 
                transform="rotate(0 50 50)" opacity="0.8" />
              
              {/* Second orbital ring */}
              <ellipse cx="50" cy="50" rx="35" ry="15" 
                fill="none" stroke="url(#atomBlue)" strokeWidth="8" 
                transform="rotate(60 50 50)" opacity="0.8" />
              
              {/* Third orbital ring */}
              <ellipse cx="50" cy="50" rx="35" ry="15" 
                fill="none" stroke="url(#atomBlue)" strokeWidth="8" 
                transform="rotate(120 50 50)" opacity="0.8" />
              
              {/* Central nucleus */}
              <circle cx="50" cy="50" r="8" fill="url(#atomBlue)" opacity="0.9" />
              <circle cx="50" cy="50" r="4" fill="#60a5fa" opacity="1" />
            </svg>
          </div>
          
          {/* VORTA Brand Name */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black bg-gradient-to-r from-blue-200 via-blue-300 to-cyan-200 bg-clip-text text-transparent" 
                style={{ 
                  fontFamily: '"Arial Black", "Helvetica Neue", Arial, sans-serif', 
                  fontWeight: '900', 
                  letterSpacing: '0.05em',
                  textShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
                }}>
              VORTA
            </h1>
          </div>
          
          <div className="mb-8">
            <div className="text-left">
              <p className="text-2xl mb-0 bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent font-black" 
                 style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", "Bradley Hand", cursive', fontWeight: '900', letterSpacing: '0.02em' }}>
                Your AI Copilot.
              </p>
              <p className="text-xl mb-6 bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent font-black" 
                 style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", "Bradley Hand", cursive', fontWeight: '900', letterSpacing: '0.02em' }}>
                for Smarter Business Decisions.
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0f1629] border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0f1629] border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
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
        className="hidden md:block md:w-1/2 bg-gradient-to-br from-[#0a0a1a] to-[#1a1a2e] rounded-3xl relative overflow-hidden shadow-2xl border border-blue-500/20"
      >
        {/* Simple Flowing Blue Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Dark navy to black gradient backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-black"></div>
          
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1920 1080"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Simple blue gradient for clean wave effect */}
              <radialGradient id="blueGlow" cx="50%" cy="50%" r="70%">
                <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 0.9 }} />
                <stop offset="50%" style={{ stopColor: '#1e40af', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#0f172a', stopOpacity: 0.2 }} />
              </radialGradient>
              
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0c1e3f', stopOpacity: 0.95 }} />
                <stop offset="30%" style={{ stopColor: '#1e40af', stopOpacity: 0.8 }} />
                <stop offset="70%" style={{ stopColor: '#2563eb', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
              </linearGradient>
              
              {/* Simple glow filter */}
              <filter id="blueGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="glow"/>
                <feMerge> 
                  <feMergeNode in="glow"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Simple flowing wave shapes matching the reference image */}
            
            {/* Main flowing curve from top-left to bottom-right */}
            <path
              d="M-100,200 Q400,100 800,300 Q1200,500 1600,400 Q1800,350 2100,400 L2100,1200 L-100,1200 Z"
              fill="url(#waveGradient)"
              filter="url(#blueGlow)"
            />
            
            {/* Secondary curve for depth */}
            <path
              d="M-100,400 Q500,250 900,450 Q1300,650 1700,550 Q1900,500 2100,550 L2100,1200 L-100,1200 Z"
              fill="url(#waveGradient)"
              opacity="0.6"
            />
            
            {/* Subtle glow effect */}
            <ellipse cx="960" cy="540" rx="800" ry="400" fill="url(#blueGlow)" opacity="0.3" />
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