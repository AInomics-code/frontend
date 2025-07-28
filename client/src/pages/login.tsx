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
        className="hidden md:block md:w-1/2 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl ml-3 relative overflow-hidden shadow-2xl border border-blue-500/20"
      >
        {/* Animated Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary Wave */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.6 }} />
                <stop offset="50%" style={{ stopColor: '#1d4ed8', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 0.2 }} />
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#4338ca', stopOpacity: 0.2 }} />
              </linearGradient>
            </defs>
            
            {/* Animated flowing waves */}
            <path
              d="M0,200 Q100,120 200,180 T400,160 L400,400 L0,400 Z"
              fill="url(#waveGradient1)"
              className="animate-pulse"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0,0; 20,10; 0,0"
                dur="6s"
                repeatCount="indefinite"
              />
            </path>
            
            <path
              d="M0,240 Q150,160 300,200 T600,180 L600,400 L0,400 Z"
              fill="url(#waveGradient2)"
              className="animate-pulse"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0,0; -15,5; 0,0"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
          
          {/* Particle dots */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-ping" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-blue-300 rounded-full opacity-40 animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-50 animate-ping" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-200 rounded-full opacity-30 animate-ping" style={{ animationDelay: '3s' }}></div>
          </div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <h2 className="text-6xl font-bold tracking-tight text-white drop-shadow-2xl mb-4">VORTA</h2>
            <p className="text-lg text-blue-200 font-light tracking-wide">AI Business Intelligence</p>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10"></div>
      </motion.div>
    </div>
  );
}