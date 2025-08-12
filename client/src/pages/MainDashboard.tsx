import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { kpiData, promptData, type KpiData, type PromptData } from "@/lib/mockData";

function TypewriterText({ text, speed = 20 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div 
      className="text-sm text-white leading-relaxed transition-all duration-500 ease-out"
      dangerouslySetInnerHTML={{
        __html: displayedText
      }}
    />
  );
}

export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState("KPIs");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState(false);
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [, setLocation] = useLocation();

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
        content: `<div class="space-y-6">
<h3 class="text-xs uppercase tracking-wider font-semibold mb-3" style="color: #a1b9ff;">1. METRIC DETECTION</h3>
<div class="text-sm text-slate-300 mb-3">
Anomaly: Chiriquí Central Store - Salsa Verde 500ml critical stockout detected via automated monitoring
</div>
<div class="bg-slate-800/40 rounded-lg p-4 border border-slate-700/30">
<div class="grid grid-cols-2 gap-4">
<div class="bg-slate-900/50 rounded p-3">
<div class="text-xs text-slate-400 mb-1">Location & Product</div>
<div class="text-sm">Chiriquí Central Store</div>
<div class="text-sm font-medium" style="color: #9bb1ff;">Salsa Verde 500ml</div>
</div>
<div class="bg-slate-900/50 rounded p-3">
<div class="text-xs text-slate-400 mb-1">Anomaly Severity</div>
<div class="text-lg font-bold" style="color: #dc2626;">89%</div>
<div class="text-xs text-slate-300">out-of-stock (12 days)</div>
</div>
</div>
<div class="mt-3 text-sm text-slate-300">
Lost <strong style="color: #9bb1ff;">2,400 units</strong> against baseline demand of <strong style="color: #9bb1ff;">2,700 units</strong> during competitor promotion period.
</div>
</div>

<h3 class="text-xs uppercase tracking-wider font-semibold mb-3" style="color: #a1b9ff;">2. ANALYSIS</h3>
<div class="bg-gradient-to-r from-slate-800/60 to-slate-800/30 rounded-lg p-4 border border-slate-700/30">
<div class="grid grid-cols-3 gap-4 mb-4">
<div class="text-center">
<div class="text-xs text-slate-400">Units Lost</div>
<div class="text-xl font-bold" style="color: #9bb1ff;">2,400</div>
</div>
<div class="text-center">
<div class="text-xs text-slate-400">Unit Price</div>
<div class="text-xl font-bold" style="color: #9bb1ff;">$3.20</div>
</div>
<div class="text-center">
<div class="text-xs text-slate-400">Revenue Loss</div>
<div class="text-xl font-bold" style="color: #dc2626;">$7,680</div>
</div>
</div>
<div class="border-t border-slate-700/30 pt-3">
<div class="text-sm text-slate-300 mb-2">
<strong>Margin Impact:</strong> $7,680 × 35% gross margin = <strong style="color: #9bb1ff;">$2,688</strong> profit lost
</div>
<div class="text-sm text-slate-300">
<strong>Market Impact:</strong> <strong style="color: #dc2626;">78%</strong> customer displacement to competitors during outage
</div>
</div>
</div>

<h3 class="text-xs uppercase tracking-wider font-semibold mb-3" style="color: #a1b9ff;">3. ROOT CAUSE</h3>
<div class="space-y-3 text-sm text-slate-300">
<div class="flex items-start gap-3">
<div class="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
<div>
<div class="font-medium text-slate-200">System Failure:</div>
<div>Distribution center's automated replenishment system used outdated velocity parameters</div>
</div>
</div>
<div class="flex items-start gap-3">
<div class="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
<div>
<div class="font-medium text-slate-200">Forecasting Gap:</div>
<div>Algorithm missed demand surge: <strong style="color: #9bb1ff;">220 units/day</strong> baseline vs <strong style="color: #9bb1ff;">400 units/day</strong> actual</div>
</div>
</div>
<div class="flex items-start gap-3">
<div class="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
<div>
<div class="font-medium text-slate-200">Safety Stock Error:</div>
<div>Required 325 units buffer but only had 180 units (<strong style="color: #dc2626;">45% shortfall</strong>)</div>
</div>
</div>
</div>

<h3 class="text-xs uppercase tracking-wider font-semibold mb-3" style="color: #a1b9ff;">4. RECOMMENDED ACTION</h3>
<div class="space-y-4 text-sm text-slate-300">
<div>
<div class="font-medium text-green-300 mb-1">IMMEDIATE (24 hours):</div>
<div>Emergency transfer of <strong style="color: #9bb1ff;">3,200 units</strong> from David warehouse to Chiriquí Central</div>
<div class="text-xs text-slate-400 mt-1">Route: David → Chiriquí (6-hour transit)</div>
</div>
<div>
<div class="font-medium text-blue-300 mb-1">SYSTEMATIC (7 days):</div>
<div>Recalibrate forecasting parameters with <strong style="color: #9bb1ff;">1.8x</strong> promotional multiplier</div>
<div>Implement daily inventory reconciliation for top <strong style="color: #9bb1ff;">50 SKUs</strong> with real-time alerts</div>
</div>
</div>

<h3 class="text-xs uppercase tracking-wider font-semibold mb-3" style="color: #a1b9ff;">5. BUSINESS VALUE</h3>
<div class="bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-lg p-4 border border-green-700/30">
<div class="grid grid-cols-2 gap-4 mb-4">
<div class="text-center">
<div class="text-xs text-slate-400">Monthly Protection</div>
<div class="text-2xl font-bold" style="color: #16a34a;">+$32K</div>
<div class="text-xs text-slate-400">margin secured</div>
</div>
<div class="text-center">
<div class="text-xs text-slate-400">Customer Recovery</div>
<div class="text-2xl font-bold" style="color: #16a34a;">+12%</div>
<div class="text-xs text-slate-400">loyalty improvement</div>
</div>
</div>
<div class="bg-slate-900/30 rounded p-3">
<div class="text-xs text-slate-400 mb-1">Value Calculation</div>
<div class="text-sm text-slate-300">$8,880 per incident × 4 monthly incidents × 35% margin = <strong style="color: #16a34a;">$12,400</strong> profit protected</div>
</div>
</div>

<div class="text-xs uppercase tracking-wider font-semibold mb-3" style="color: #a1b9ff;">PROCESS FLOW</div>
<div class="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
<div class="flex items-center justify-between text-center">
<div class="flex-1">
<div class="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
<span class="text-red-400 font-bold">89%</span>
</div>
<div class="text-xs text-slate-400">Stockout</div>
</div>
<div class="flex-1 flex justify-center">
<svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
</svg>
</div>
<div class="flex-1">
<div class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
<span class="text-blue-400 font-bold">3.2K</span>
</div>
<div class="text-xs text-slate-400">Emergency Transfer</div>
</div>
<div class="flex-1 flex justify-center">
<svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
</svg>
</div>
<div class="flex-1">
<div class="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
<span class="text-green-400 font-bold">$32K</span>
</div>
<div class="text-xs text-slate-400">Monthly Protection</div>
</div>
</div>
</div>

<div class="mt-4 pt-3 border-t border-slate-700/30">
<div class="flex items-center text-blue-300/80 text-xs">
<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
</svg>
<span>Presented by VORTA using real-time AInomics analysis</span>
</div>
</div>
</div>`
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
            <p className="text-xs text-slate-400 tracking-wide uppercase">AI Copilot</p>
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
                      <TypewriterText text={message.content} speed={10} />
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
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
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

          <button 
            onClick={() => setLocation('/collaboration')}
            className="w-10 h-10 rounded-xl bg-slate-700/30 hover:bg-slate-600/50 flex items-center justify-center transition-all duration-200 hover:scale-105"
          >
            <svg className="w-5 h-5 text-slate-400 hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>

          <button 
            onClick={() => setLocation('/scenario-simulator')}
            className="w-10 h-10 rounded-xl bg-slate-700/30 hover:bg-amber-500/50 flex items-center justify-center transition-all duration-200 hover:scale-105"
            title="AI Scenario Simulator"
          >
            <svg className="w-5 h-5 text-slate-400 hover:text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
        <p className="text-xs text-slate-400 tracking-wide uppercase">AI Copilot</p>
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