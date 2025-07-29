import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { kpiData, promptData, type KpiData, type PromptData } from "@/lib/mockData";

export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState("KPIs");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handlePromptClick = (prompt: PromptData) => {
    const question = `${prompt.title}: ${prompt.description}`;
    setInputValue(question);
  };

  const handleSubmit = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    setIsLoading(true);
    setResponse("");
    
    // Simulate AI response
    setTimeout(() => {
      setResponse(`Based on your query "${inputValue}", here's a comprehensive business intelligence analysis...`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] px-6 py-10 text-white font-sans">
      
      {/* Logo & Brand */}
      <div className="flex flex-col items-center gap-1 mb-8">
        <div
          className="vortex-icon mb-2"
          style={
            {
              width: "32px",
              height: "32px",
              "--vortex-size": "32px",
              animation: "vortex-slow-rotate 20s linear infinite",
            } as React.CSSProperties
          }
        >
          <div className="vortex-blade"></div>
          <div className="vortex-blade"></div>
          <div className="vortex-blade"></div>
          <div className="vortex-blade"></div>
          <div className="vortex-blade"></div>
        </div>
        <h1 className="text-lg font-semibold tracking-wide text-[#CBD5E1]">VORTA</h1>
        <p className="text-xs text-slate-400 tracking-wide uppercase">AINOMICS</p>
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {["KPIs", "Try these prompts"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-1.5 rounded-full transition-all duration-300 text-sm font-medium ${
              activeTab === tab
                ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg"
                : "bg-slate-700 hover:bg-slate-600 text-slate-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Animated Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto mb-32"
      >
        {activeTab === "KPIs"
          ? kpiData.map((card: KpiData, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className="w-80"
              >
                <Card className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/70 rounded-lg p-4 h-full transition-all duration-200 hover:bg-slate-800/80">
                  <div className="flex items-center mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  </div>
                  <h3 className="text-xs font-medium text-slate-300 mb-1 leading-tight">{card.title}</h3>
                  <div className="text-lg font-semibold text-white mb-0.5">{card.value}</div>
                  <p className="text-xs text-slate-400 leading-tight">{card.description}</p>
                </Card>
              </motion.div>
            ))
          : promptData.map((prompt: PromptData, idx: number) => {
              const icons = [
                // Chart bar icon for regional performance
                <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>,
                // Exclamation triangle icon for underperforming areas
                <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>,
                // Archive icon for slow-moving inventory
                <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>,
                // Trending up icon for quarterly forecast
                <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>,
                // Calculator icon for budget variance
                <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 0a1 1 0 100 2h.01a1 1 0 100-2H9zm2 0a1 1 0 100 2h.01a1 1 0 100-2H11zm0-2a1 1 0 100 2h.01a1 1 0 100-2H11zm-2 0a1 1 0 100 2h.01a1 1 0 100-2H9zm-2 0a1 1 0 100 2h.01a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>,
                // Globe icon for channel performance
                <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                </svg>
              ];
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className="cursor-pointer w-80"
                  onClick={() => handlePromptClick(prompt)}
                >
                  <Card className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 hover:border-blue-400/40 hover:bg-slate-800/60 rounded-lg p-4 h-full transition-all duration-200 group">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        {icons[idx]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-white group-hover:text-blue-200 transition-colors mb-1 leading-tight">{prompt.title}</h4>
                        <p className="text-xs text-slate-400 leading-tight">{prompt.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
      </motion.div>

      {/* Response Display */}
      {response && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 z-40">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-blue-200">AI Response</h3>
              <button 
                onClick={() => setResponse("")}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed">{response}</p>
          </motion.div>
        </div>
      )}

      {/* Enhanced Input bar */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4">
        <div className="bg-gradient-to-r from-slate-800/95 via-slate-800/98 to-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-2xl shadow-black/20 hover:border-blue-400/50 transition-all duration-300">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Ask anything about your business..."
            className="flex-1 bg-transparent outline-none text-white placeholder-slate-400 text-base"
            disabled={isLoading}
          />
          <div className="flex gap-3 items-center">
            <button className="w-9 h-9 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center text-slate-400 hover:text-slate-300 transition-all duration-200 hover:scale-105">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="w-9 h-9 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center text-slate-400 hover:text-slate-300 transition-all duration-200 hover:scale-105">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={handleSubmit}
              disabled={!inputValue.trim() || isLoading}
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-slate-600 disabled:to-slate-600 flex items-center justify-center text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              {isLoading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}