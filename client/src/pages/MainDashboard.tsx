import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { kpiData, promptData, type KpiData, type PromptData } from "@/lib/mockData";
import { apiService } from "@/services/apiService";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

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
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
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

    try {
      // Call the backend API
      const response = await apiService.invokeAI(currentQuery);

      // Add AI response
      const aiResponse = {
        role: 'assistant' as const,
        content: response.response
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      // Handle error
      const errorResponse = {
        role: 'assistant' as const,
        content: `<div class="text-red-400">Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}</div>`
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    setChatMode(false);
    setMessages([]);
  };

  if (chatMode) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] px-6 py-10 text-white font-sans">
        {/* Chat Header */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-semibold tracking-wide text-[#CBD5E1]">VORTA</h1>
            <p className="text-xs text-slate-400 tracking-wide uppercase">AI Copilot</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 mb-32">
            {messages.map((message, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-3xl ${message.role === 'user' ? 'bg-blue-600/20 ml-16' : 'bg-slate-800/40 mr-16'} rounded-2xl p-6 border ${message.role === 'user' ? 'border-blue-500/30' : 'border-slate-700/30'}`}>
                  {message.role === 'user' ? (
                    <div className="text-white text-sm">{message.content}</div>
                  ) : (
                    <MarkdownRenderer content={message.content} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4">
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
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-white font-sans flex">

      {/* Left Sidebar */}

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