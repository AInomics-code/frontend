import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { kpiData, promptData, type KpiData, type PromptData } from "@/lib/mockData";

export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState("KPIs");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState(false);
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);

  const handlePromptClick = (prompt: PromptData) => {
    const question = `${prompt.title}`;
    setInputValue(question);
  };

  const handleSubmit = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    setIsLoading(true);
    setChatMode(true);
    
    // Add user message
    const userMessage = { role: 'user' as const, content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    const currentQuery = inputValue;
    setInputValue("");
    
    // Simulate AI response with AInomics structure
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant' as const,
        content: `**1. Question**
${currentQuery}

**2. Analysis (AInomics)**
• Regional performance shows variance across 3 key markets with availability rates between **72-89%**
• Sales velocity indicates **$45,000 monthly** revenue at risk from stockout scenarios
• Demand forecasting accuracy at **78%** vs industry benchmark of **85%**
• Cost leakage identified in supply chain efficiency metrics

**3. Recommended Action**
• Implement dynamic inventory rebalancing across underperforming regions
• Review and adjust safety stock levels for top **15 SKUs**
• Optimize procurement cycles based on real-time demand signals

**4. Business Value**
Potential revenue recovery of **$32,000-48,000 monthly** through improved availability and reduced stockouts.

> ✨ Presented by VORTA using real-time AInomics analysis.`
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleBackToDashboard = () => {
    setChatMode(false);
    setMessages([]);
  };

  if (chatMode) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] px-6 py-10 text-white font-sans">
        {/* Chat Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-semibold tracking-wide text-[#CBD5E1]">VORTA</h1>
            <p className="text-xs text-slate-400 tracking-wide uppercase">Copilot</p>
          </div>
          <div className="w-20"></div>
        </div>

        {/* Chat Messages */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 mb-32">
            {messages.map((message, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-3xl">
                  {message.role === 'user' ? (
                    <div className="bg-blue-600/20 border border-blue-500/30 backdrop-blur-sm rounded-2xl px-4 py-3">
                      <p className="text-sm text-white leading-relaxed">{message.content}</p>
                    </div>
                  ) : (
                    <div className="py-2">
                      <div 
                        className="text-sm text-white leading-relaxed prose prose-invert prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: message.content
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/^• /gm, '• ')
                            .replace(/^> (.*)/gm, '<blockquote class="text-blue-200 italic border-l-2 border-blue-400 pl-3 my-2">$1</blockquote>')
                            .replace(/\n/g, '<br>')
                        }}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {/* Loading Message */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-3xl py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-sm text-slate-400">Analyzing...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Chat Input */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-6">
          <div className="bg-gradient-to-r from-slate-800/95 via-slate-800/98 to-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-2xl shadow-black/20">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSubmit()}
              placeholder="Ask anything about your business..."
              className="flex-1 bg-transparent outline-none text-white placeholder-slate-400 text-base"
              disabled={isLoading}
            />
            <button 
              onClick={() => handleSubmit()}
              disabled={!inputValue.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-slate-600 disabled:to-slate-600 flex items-center justify-center text-white transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
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
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-white font-sans flex">
      
      {/* Left Sidebar */}
      <div className="fixed left-4 top-4 bottom-4 w-16 bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl flex flex-col items-center py-6 z-10">
        {/* Top Icon - Dashboard/Home */}
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-6">
          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm6 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zm-6 8a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zm6 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Navigation Icons */}
        <div className="flex flex-col space-y-4">
          <button className="w-10 h-10 rounded-xl bg-slate-700/30 hover:bg-slate-600/50 flex items-center justify-center transition-all duration-200 hover:scale-105">
            <svg className="w-5 h-5 text-slate-400 hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>

          <button className="w-10 h-10 rounded-xl bg-slate-700/30 hover:bg-slate-600/50 flex items-center justify-center transition-all duration-200 hover:scale-105">
            <svg className="w-5 h-5 text-slate-400 hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <button className="w-10 h-10 rounded-xl bg-slate-700/30 hover:bg-slate-600/50 flex items-center justify-center transition-all duration-200 hover:scale-105">
            <svg className="w-5 h-5 text-slate-400 hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>

          <button className="w-10 h-10 rounded-xl bg-slate-700/30 hover:bg-slate-600/50 flex items-center justify-center transition-all duration-200 hover:scale-105">
            <svg className="w-5 h-5 text-slate-400 hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Bottom Icon - User/Profile */}
        <div className="mt-auto">
          <button className="w-10 h-10 rounded-xl bg-slate-700/30 hover:bg-slate-600/50 flex items-center justify-center transition-all duration-200 hover:scale-105">
            <svg className="w-5 h-5 text-slate-400 hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pl-24 pr-8 py-10">
        
        {/* Logo & Brand */}
      <div className="flex flex-col items-center gap-1 mb-8">
        <div
          className="vortex-icon mb-1"
          style={
            {
              width: "72px",
              height: "72px",
              "--vortex-size": "72px",
              animation: "vortex-slow-rotate 20s linear infinite",
              opacity: "0.7",
            } as React.CSSProperties
          }
        >
          <div className="vortex-blade"></div>
          <div className="vortex-blade"></div>
          <div className="vortex-blade"></div>
          <div className="vortex-blade"></div>
          <div className="vortex-blade"></div>
        </div>
        <h1 className="text-lg font-semibold tracking-wide text-slate-300 opacity-80">VORTA</h1>
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
                className="w-96"
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
                // Business chart for regional performance
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>,
                // Alert triangle for underperforming areas
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>,
                // Package for inventory management
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>,
                // Trending up for forecasting
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>,
                // Document with calculator for budget analysis
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>,
                // Global network for channel performance
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              ];
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className="cursor-pointer w-[420px]"
                  onClick={() => handlePromptClick(prompt)}
                >
                  <Card className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 hover:border-blue-400/40 hover:bg-slate-800/60 rounded-lg p-4 h-24 transition-all duration-200 group">
                    <div className="flex items-start gap-3 h-full">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {icons[idx]}
                      </div>
                      <div className="flex flex-col justify-center flex-1 min-w-0 gap-1">
                        <h4 className="text-base font-medium text-white group-hover:text-blue-200 transition-colors leading-tight">{prompt.title}</h4>
                        <p className="text-sm text-slate-400 leading-snug">{prompt.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
      </motion.div>

      {/* Enhanced Input bar */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4">
        <div className="bg-gradient-to-r from-slate-800/95 via-slate-800/98 to-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-2xl shadow-black/20 hover:border-blue-400/50 transition-all duration-300">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSubmit()}
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
              onClick={() => handleSubmit()}
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
    </div>
  );
}