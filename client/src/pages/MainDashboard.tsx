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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
      >
        {activeTab === "KPIs"
          ? kpiData.map((card: KpiData, idx: number) => (
              <Card
                key={idx}
                className="bg-gradient-to-b from-slate-800 to-slate-900 p-5 rounded-2xl shadow-md hover:ring-1 hover:ring-blue-400 border border-slate-700"
              >
                <h3 className="text-xl font-bold mb-2 text-white">{card.title}</h3>
                <p className="text-sm text-slate-400">{card.description}</p>
                <div className="mt-4 text-3xl font-extrabold text-white">{card.value}</div>
              </Card>
            ))
          : promptData.map((prompt: PromptData, idx: number) => (
              <Card
                key={idx}
                className="bg-slate-800 hover:bg-slate-700 p-5 rounded-xl text-left shadow-md transition cursor-pointer border border-slate-600"
              >
                <h4 className="text-md font-semibold mb-1 text-white">{prompt.title}</h4>
                <p className="text-sm text-slate-400">{prompt.description}</p>
              </Card>
            ))}
      </motion.div>

      {/* Input bar */}
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4">
        <div className="bg-slate-800 border border-slate-700 rounded-full px-6 py-3 flex items-center gap-4 shadow-lg">
          <input
            placeholder="Ask anything about your business..."
            className="flex-1 bg-transparent outline-none text-white placeholder-slate-400"
          />
          <div className="flex gap-3 items-center text-slate-400 text-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
            </svg>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}