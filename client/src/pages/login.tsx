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
        {/* Static Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 800 600"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.8 }} />
                <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 0.3 }} />
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.2 }} />
              </linearGradient>
            </defs>
            
            {/* Flowing wave paths - static */}
            <path
              d="M0,400 Q200,300 400,350 T800,320 L800,600 L0,600 Z"
              fill="url(#waveGradient1)"
            />
            
            <path
              d="M0,450 Q300,360 600,400 T1200,380 L1200,600 L0,600 Z"
              fill="url(#waveGradient2)"
            />
            
            {/* Additional flowing lines */}
            <path
              d="M0,300 Q150,200 300,250 Q450,300 600,220 Q750,140 900,180"
              stroke="url(#waveGradient1)"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
            
            <path
              d="M100,350 Q250,280 400,320 Q550,360 700,290 Q850,220 1000,260"
              stroke="url(#waveGradient2)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.4"
            />
          </svg>
          
          {/* Static particle dots */}
          <div className="absolute inset-0">
            {/* Large dots */}
            <div className="absolute top-1/4 left-1/5 w-3 h-3 bg-cyan-400 rounded-full opacity-60"></div>
            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-50"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-blue-300 rounded-full opacity-40"></div>
            <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full opacity-45"></div>
            
            {/* Small dots */}
            <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-cyan-300 rounded-full opacity-30"></div>
            <div className="absolute bottom-1/4 right-1/5 w-1.5 h-1.5 bg-blue-200 rounded-full opacity-35"></div>
            <div className="absolute top-3/4 left-2/5 w-1 h-1 bg-purple-300 rounded-full opacity-25"></div>
            <div className="absolute top-1/6 right-2/5 w-1 h-1 bg-blue-400 rounded-full opacity-40"></div>
            
            {/* Micro dots */}
            <div className="absolute top-2/5 left-1/2 w-0.5 h-0.5 bg-cyan-200 rounded-full opacity-20"></div>
            <div className="absolute bottom-2/5 right-1/6 w-0.5 h-0.5 bg-blue-300 rounded-full opacity-25"></div>
            <div className="absolute top-5/6 left-1/4 w-0.5 h-0.5 bg-purple-200 rounded-full opacity-15"></div>
          </div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <h2 className="text-6xl font-bold tracking-tight text-white drop-shadow-2xl mb-4">VORTA</h2>
            <p className="text-lg text-blue-200 font-light tracking-wide">AI Business Intelligence</p>
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5"></div>
      </motion.div>
    </div>
  );
}