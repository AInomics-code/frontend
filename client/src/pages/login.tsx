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
    // Allow login with any password for demo purposes
    if (email && password) {
      // Store login state in sessionStorage (will be cleared on refresh)
      sessionStorage.setItem("isLoggedIn", "true");
      setLocation("/chat-clean-top");
    } else {
      setError("Please enter both email and password");
    }
  };

  return (
    <div className="min-h-screen flex bg-white p-4 text-gray-900 gap-2">
      {/* LEFT CARD */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-1/2 bg-white rounded-3xl flex flex-col justify-center px-8 md:px-12 shadow-2xl border border-gray-200"
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
          <div className="text-center mb-6">
            <h1 className="text-lg font-medium text-blue-600" 
                style={{ 
                  fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif', 
                  fontWeight: '500', 
                  letterSpacing: '0.1em'
                }}>
              VORTA
            </h1>
          </div>
          
          <div className="mb-8">
            <div className="text-left">
              <p className="text-4xl mb-0 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent font-bold leading-tight" 
                 style={{ 
                   fontFamily: '"Inter", "Helvetica Neue", "Segoe UI", system-ui, sans-serif', 
                   fontWeight: '700', 
                   letterSpacing: '-0.02em',
                   textShadow: 'none'
                 }}>
                Your AI Copilot
              </p>
              <p className="text-4xl mb-6 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent font-bold leading-tight" 
                 style={{ 
                   fontFamily: '"Inter", "Helvetica Neue", "Segoe UI", system-ui, sans-serif', 
                   fontWeight: '700', 
                   letterSpacing: '-0.02em',
                   textShadow: 'none'
                 }}>
                For Business Intelligence
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all font-medium shadow-lg hover:shadow-blue-500/25 text-white"
            >
              Log in
            </button>
          </form>

          
        </div>
      </motion.div>

      {/* RIGHT CARD */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl relative overflow-hidden shadow-2xl border border-gray-200"
      >
        {/* Simple Flowing Blue Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Light blue gradient backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-200 to-cyan-100"></div>
          
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1920 1080"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Light blue gradient for clean wave effect */}
              <radialGradient id="blueGlow" cx="50%" cy="50%" r="70%">
                <stop offset="0%" style={{ stopColor: '#dbeafe', stopOpacity: 0.8 }} />
                <stop offset="50%" style={{ stopColor: '#bfdbfe', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#93c5fd', stopOpacity: 0.4 }} />
              </radialGradient>
              
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#dbeafe', stopOpacity: 0.7 }} />
                <stop offset="30%" style={{ stopColor: '#bfdbfe', stopOpacity: 0.6 }} />
                <stop offset="70%" style={{ stopColor: '#93c5fd', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.4 }} />
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
          
          {/* Light finish overlay for polished look */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent" 
            style={{ 
              backdropFilter: 'blur(0.2px)',
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(255,255,255,0.1) 100%)'
            }}
          ></div>
        </div>

        {/* Subtle light glow effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/10 via-transparent to-cyan-200/10"></div>
      </motion.div>
    </div>
  );
}