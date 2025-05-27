import { useState } from "react";
import { useLocation } from "wouter";
import laDonaLogo from "@assets/Screenshot 2025-05-19 alle 15.08.46.png";

export default function Login() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setIsError(false);
    
    // Simulate login process with elegant animation
    setTimeout(() => {
      // Start fade out animation
      setFadeOut(true);
      
      // Navigate after fade animation completes
      setTimeout(() => {
        setLocation("/dashboard");
      }, 500);
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
      <div className={`bg-white px-10 py-12 rounded-3xl shadow-xl shadow-gray-200 text-center max-w-md w-full border border-neutral-200 transition-all duration-500 ${fadeOut ? 'fade-out-login' : ''} ${isError ? 'invalid-login' : ''}`}>
        
        {/* Vorta Vortex Icon */}
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
        
        {/* Welcome Content with La Doña Branding */}
        <div className="mb-8 text-center space-y-3">
          <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">Welcome back</h1>
          <p className="text-base text-gray-500 leading-relaxed">Sign in to access La Doña Intelligence</p>
          <img 
            src={laDonaLogo} 
            alt="La Doña" 
            className="mx-auto h-8 mt-4 opacity-80"
          />
        </div>

        {/* Login Form */}
        <div className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Login"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:border-red-400 focus:shadow-inner focus:outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 shadow-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:border-red-400 focus:shadow-inner focus:outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 shadow-sm"
          />
        </div>

        {/* Login Button */}
        <button 
          onClick={handleLogin}
          disabled={isLoading}
          className={`w-full font-semibold tracking-wide py-3 px-6 rounded-xl transition-all duration-300 transform ${
            isLoading 
              ? 'bg-gradient-to-r from-[#d70000] to-[#ff4d4d] text-white scale-[0.98] cursor-wait' 
              : 'bg-gradient-to-r from-[#d70000] to-[#ff4d4d] hover:from-red-700 hover:to-red-500 text-white hover:text-white/90 hover:scale-[1.02] shadow-md hover:shadow-lg active:shadow-[0_0_12px_rgba(255,0,0,0.25)]'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="login-loading-dot"></div>
              <div className="login-loading-dot"></div>
              <div className="login-loading-dot"></div>
            </div>
          ) : (
            "Login"
          )}
        </button>

        {/* Enhanced Footer with Ainomics Logo */}
        <div className="flex items-center justify-center mt-6 space-x-2 text-xs text-gray-400">
          <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-sm opacity-80 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span>
            Powered by <strong className="text-gray-500">Ainomics Inc</strong> · Vorta Strategic Platform
          </span>
        </div>
      </div>
    </div>
  );
}