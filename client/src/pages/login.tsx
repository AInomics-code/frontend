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
        {/* Modern Abstract Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Advanced gradients for smooth lighting transitions */}
              <radialGradient id="glowGradient" cx="30%" cy="40%">
                <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 0.4 }} />
                <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 0.05 }} />
              </radialGradient>
              
              <linearGradient id="waveFlow1" x1="0%" y1="30%" x2="100%" y2="70%">
                <stop offset="0%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.7 }} />
                <stop offset="40%" style={{ stopColor: '#3b82f6', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.3 }} />
              </linearGradient>
              
              <linearGradient id="waveFlow2" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 0.6 }} />
                <stop offset="60%" style={{ stopColor: '#2563eb', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.2 }} />
              </linearGradient>
              
              <linearGradient id="accentFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#93c5fd', stopOpacity: 0.1 }} />
              </linearGradient>
            </defs>
            
            {/* Background glow */}
            <ellipse cx="400" cy="300" rx="600" ry="400" fill="url(#glowGradient)" />
            
            {/* Layered flowing curves */}
            <path
              d="M0,500 Q200,350 400,420 Q600,490 800,380 Q900,320 1000,360 L1000,800 L0,800 Z"
              fill="url(#waveFlow1)"
            />
            
            <path
              d="M0,580 Q150,420 350,480 Q550,540 750,460 Q850,420 1000,440 L1000,800 L0,800 Z"
              fill="url(#waveFlow2)"
            />
            
            <path
              d="M0,650 Q100,550 300,600 Q500,650 700,580 Q850,530 1000,550 L1000,800 L0,800 Z"
              fill="url(#accentFlow)"
            />
            
            {/* Elegant highlight curves */}
            <path
              d="M0,400 Q200,280 400,340 Q600,400 800,300 Q900,250 1000,280"
              stroke="url(#waveFlow1)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.4"
            />
            
            <path
              d="M50,450 Q250,320 450,380 Q650,440 850,340 Q950,290 1050,320"
              stroke="url(#accentFlow)"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
            
            {/* Soft glow highlights */}
            <circle cx="300" cy="350" r="80" fill="url(#glowGradient)" opacity="0.2" />
            <circle cx="700" cy="450" r="120" fill="url(#glowGradient)" opacity="0.15" />
          </svg>
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