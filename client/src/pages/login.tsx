import { useState } from "react";
import { useLocation } from "wouter";
import ainomicsLogo from "@assets/Screenshot 2025-05-27 alle 11.21.46.png";

export default function Login() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    setIsLoading(true);
    
    // Simulate login process with elegant animation
    setTimeout(() => {
      setLocation("/dashboard");
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-[#F9F9F6] transition-opacity duration-300"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="bg-white px-10 py-12 rounded-3xl shadow-xl shadow-gray-200 text-center max-w-md w-full border border-neutral-200">
        
        {/* Logo Animation */}
        <div className="mb-8 flex justify-center">
          <div 
            className={`vortex-icon ${isLoading ? 'active' : 'slow-spin'}`} 
            style={{ 
              width: '40px', 
              height: '40px',
              filter: 'drop-shadow(0 0 5px rgba(229, 9, 20, 0.3))'
            }}
          >
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
          </div>
        </div>
        
        {/* Welcome Content */}
        <div className="mb-8 space-y-3">
          <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">Welcome back</h1>
          <p className="text-base text-gray-500 leading-relaxed">Sign in to access La Doña Intelligence</p>
        </div>

        {/* Login Form */}
        <div className="space-y-4 mb-8">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:border-red-500 focus:shadow-inner focus:outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:border-red-500 focus:shadow-inner focus:outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Login Button */}
        <button 
          onClick={handleLogin}
          disabled={isLoading}
          className={`w-full font-semibold tracking-wide py-3 px-6 rounded-xl transition-all duration-300 transform ${
            isLoading 
              ? 'bg-gradient-to-r from-red-600 to-red-700 text-white scale-[0.98] animate-pulse cursor-wait' 
              : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white hover:scale-[1.02] shadow-md hover:shadow-lg'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Accessing Dashboard...</span>
            </div>
          ) : (
            "Enter Dashboard"
          )}
        </button>

        {/* Enhanced Footer with Ainomics Logo */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-400">
          <img 
            src={ainomicsLogo} 
            alt="Ainomics Logo" 
            className="w-6 h-6 drop-shadow-[0_0_2px_rgba(0,0,0,0.05)]" 
          />
          <span>
            Powered by <span className="font-medium text-gray-500">Ainomics Inc</span> · Vorta Strategic Platform
          </span>
        </div>
      </div>
    </div>
  );
}