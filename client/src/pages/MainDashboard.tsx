import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { kpiData, promptData, type KpiData, type PromptData } from "@/lib/mockData";

export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState("KPIs");

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
                className="w-64"
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
          : promptData.map((prompt: PromptData, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className="cursor-pointer w-80"
              >
                <Card className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 hover:border-blue-400/40 hover:bg-slate-800/60 rounded-lg p-4 h-full transition-all duration-200 group">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium text-white group-hover:text-blue-200 transition-colors mb-1 leading-tight">{prompt.title}</h4>
                      <p className="text-xs text-slate-400 leading-tight">{prompt.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
      </motion.div>

      {/* Enhanced Input bar */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4">
        <div className="bg-gradient-to-r from-slate-800/95 via-slate-800/98 to-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-2xl shadow-black/20 hover:border-blue-400/50 transition-all duration-300">
          <input
            placeholder="Ask anything about your business..."
            className="flex-1 bg-transparent outline-none text-white placeholder-slate-400 text-base"
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
            <button className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 flex items-center justify-center text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}