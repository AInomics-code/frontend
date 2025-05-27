import { useState } from "react";
import { useLocation } from "wouter";

export default function Login() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

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
      <div className="bg-white p-10 rounded-3xl shadow-[0_12px_30px_rgba(0,0,0,0.08)] text-center max-w-md w-full border border-gray-100">
        
        {/* Logo Animation */}
        <div className="mb-8 flex justify-center">
          <div className={`vortex-icon ${isLoading ? 'active' : 'slow-spin'}`} style={{ width: '48px', height: '48px' }}>
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

        {/* Login Button */}
        <button 
          onClick={handleLogin}
          disabled={isLoading}
          className={`w-full font-medium py-4 px-8 rounded-xl transition-all duration-300 transform ${
            isLoading 
              ? 'bg-[#cc0500] text-white scale-[0.98] animate-pulse cursor-wait' 
              : 'bg-[#E10600] hover:bg-[#cc0500] text-white hover:scale-[1.02] shadow-lg hover:shadow-xl'
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

        {/* Subtle Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Powered by Vorta AI • Strategic Intelligence Platform
          </p>
        </div>
      </div>
    </div>
  );
}