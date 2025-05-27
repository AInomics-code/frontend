import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { Menu, TrendingUp, AlertTriangle, Star, Mic, Send, BarChart3, User, Phone, Package, MapPin, ArrowRight, Search, Globe, Target, TrendingDown, Check, ArrowDown, Paperclip, MoreHorizontal, Copy, FileText, RotateCcw, Plus, BarChart, Brain, Info } from "lucide-react";
import vortexLogo from "@assets/Screenshot 2025-05-26 alle 13.53.01.png";
import laDonaLogo from "@assets/Screenshot 2025-05-19 alle 15.08.46.png";

export function ChatInterface() {
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [typingText, setTypingText] = useState("");
  const [showActions, setShowActions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [isLoading]);

  const typewriterEffect = (text: string, callback: () => void) => {
    let index = 0;
    setTypingText("");
    const timer = setInterval(() => {
      if (index < text.length) {
        setTypingText(prev => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
        callback();
      }
    }, 30);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    setIsProcessing(true);
    setShowResponse(true);
    setShowActions(false);
    
    // Simulate processing delay
    setTimeout(() => {
      const response = "Based on your La Doña regional performance data, I can see that Colón region is currently at 67% of target with some challenges in vinegar sales and delivery timelines. Would you like me to analyze the specific factors contributing to this performance gap?";
      
      typewriterEffect(response, () => {
        setCurrentResponse(response);
        setIsProcessing(false);
        setTimeout(() => setShowActions(true), 500);
      });
    }, 2000);
    
    setInputValue("");
  };

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  const handleFileAttach = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeAttachedFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSelectConversation = (id: number | null) => {
    setSelectedConversationId(id);
    // Close sidebar on mobile when selecting a conversation
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };



  return (
    <div className="min-h-screen w-full bg-[#F9F9F6]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={laDonaLogo} 
              alt="La Doña Logo" 
              className="h-8 w-auto"
            />
            <h1 className="text-gray-700 font-semibold text-lg">
              La Doña Business Intelligence
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-800 text-sm font-medium">Carlos Mendoza</span>
                <span className="text-gray-500 text-xs">General Manager</span>
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200">
              <span>Logout</span>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 space-y-8">

        {/* AI Assistant Chat */}
        <section className="space-y-4">
          
          {/* Vorta Logo */}
          <div className="flex justify-center mb-8">
            <div className="vortex-icon" style={{ width: '40px', height: '40px' }}>
              <div className="vortex-blade"></div>
              <div className="vortex-blade"></div>
              <div className="vortex-blade"></div>
              <div className="vortex-blade"></div>
              <div className="vortex-blade"></div>
              <div className="vortex-blade"></div>
            </div>
          </div>

          <div className="space-y-3">
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-3 animate-[chatDrop_200ms_ease-out]">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="vortex-icon active scale-75">
                    <div className="vortex-blade"></div>
                    <div className="vortex-blade"></div>
                    <div className="vortex-blade"></div>
                    <div className="vortex-blade"></div>
                    <div className="vortex-blade"></div>
                    <div className="vortex-blade"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-xl px-4 py-3 inline-block shadow-sm">
                    <p className="text-sm text-gray-400 italic animate-pulse">Preparing insights…</p>
                  </div>
                </div>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Dynamic Response Area */}
          {showResponse && (
            <div className="mt-6 px-6">
              <div className="w-full max-w-[960px] mx-auto">
                <div 
                  className="bg-[#fafaf9] rounded-3xl border border-gray-200 p-6 transition-all duration-300 ease-in-out transform origin-top animate-[slideUp_0.3s_ease-out] elevated-card"
                >
                  {/* Assistant Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                      <div className={`vortex-icon ring-1 ring-gray-200 rounded-full p-1 ${isProcessing ? 'active' : currentResponse ? 'pulse-glow' : ''}`} style={{ width: '20px', height: '20px' }}>
                        <div className="vortex-blade"></div>
                        <div className="vortex-blade"></div>
                        <div className="vortex-blade"></div>
                        <div className="vortex-blade"></div>
                        <div className="vortex-blade"></div>
                        <div className="vortex-blade"></div>
                      </div>
                      <span>Vorta</span>
                      <span className="text-gray-400 font-normal">· Strategic Assistant</span>
                    </div>
                    
                    {/* Quick Actions Dropdown */}
                    {currentResponse && (
                      <div className="relative">
                        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Response Content */}
                  <div className="space-y-4">
                    {isProcessing && !typingText ? (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        <span className="text-gray-500 text-sm ml-2">Analyzing your data...</span>
                      </div>
                    ) : (
                      <div className="text-base leading-relaxed text-gray-800">
                        {isProcessing ? (
                          <span className="inline-block border-r-2 border-gray-400 animate-pulse pr-1">
                            {typingText}
                          </span>
                        ) : (
                          <div className="space-y-3">
                            <p>{currentResponse}</p>
                            {currentResponse && (
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <div className="w-3 h-3 border-2 border-green-500 rounded-full flex items-center justify-center">
                                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                </div>
                                <span>High Confidence</span>
                                <Info className="w-3 h-3 text-gray-400 cursor-help" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Context Links */}
                  {currentResponse && !isProcessing && (
                    <div className="mt-4 text-xs text-gray-500">
                      Context: <span className="text-blue-600 hover:underline cursor-pointer">Colón Region Dashboard</span> • <span className="text-blue-600 hover:underline cursor-pointer">Last Week's Trend</span>
                    </div>
                  )}

                  {/* Animated Suggestion Chips */}
                  {showActions && currentResponse && !isProcessing && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200 hover:scale-105 animate-[fadeInUp_0.3s_ease-out]">
                          <BarChart className="w-3 h-3" />
                          Show detailed breakdown
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200 hover:scale-105 animate-[fadeInUp_0.3s_ease-out_0.1s_both]">
                          <Globe className="w-3 h-3" />
                          Compare with regions
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200 hover:scale-105 animate-[fadeInUp_0.3s_ease-out_0.2s_both]">
                          <Brain className="w-3 h-3" />
                          Suggest action plan
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Attached Files Display */}
          {attachedFiles.length > 0 && (
            <div className="mt-4 px-6">
              <div className="w-full max-w-[960px] mx-auto">
                <div className="flex flex-wrap gap-2">
                  {attachedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm">
                      <Paperclip className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700 truncate max-w-[150px]">{file.name}</span>
                      <button
                        onClick={() => removeAttachedFile(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200 ml-1"
                        title="Remove file"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Vorta Input Bar - Claude x Perplexity Inspired */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3 w-full max-w-[960px] mx-auto px-4 py-3 rounded-xl bg-white shadow-sm border border-gray-100 focus-within:ring-2 focus-within:ring-[#E10600]/30 focus-within:ring-offset-1 transition-all duration-200">
              {/* Left: Search Icon */}
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />

              {/* Center: Input */}
              <input 
                className="flex-grow bg-transparent outline-none placeholder-gray-400 text-gray-800 text-base"
                placeholder="Ask about KPIs or performance..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              {/* Optional Tools */}
              <div className="flex items-center gap-2 text-gray-400">
                {/* File Attach Button */}
                <label className="cursor-pointer hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-50" title="Attach files for analysis">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.png,.jpg,.jpeg"
                    onChange={handleFileAttach}
                    className="hidden"
                  />
                  <Paperclip className="w-4 h-4" />
                </label>

                <button 
                  className="hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-50"
                  title="Search insights"
                >
                  <Globe className="w-4 h-4" />
                </button>
                <button 
                  className={`hover:text-gray-600 transition-all duration-200 p-2 rounded-full ${isVoiceActive ? 'bg-red-100/30 text-red-500 animate-pulse' : 'hover:bg-gray-50'}`}
                  onClick={handleVoiceToggle}
                  title="Voice mode (beta)"
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>

              {/* CTA Button */}
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-all duration-200 ${
                  (inputValue.trim() || attachedFiles.length > 0)
                    ? isProcessing 
                      ? 'bg-[#cc0500] text-white animate-pulse cursor-wait'
                      : 'bg-[#E10600] text-white hover:bg-[#cc0500] hover:scale-[1.03]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                onClick={handleSendMessage}
                disabled={(!inputValue.trim() && attachedFiles.length === 0) || isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Ask'}
              </button>
            </div>
          </div>
        </section>





      </main>
    </div>
  );
}
