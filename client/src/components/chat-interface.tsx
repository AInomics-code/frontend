import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { Menu, TrendingUp, AlertTriangle, Star, Mic, Send, BarChart3, User, Phone, Package, MapPin, ArrowRight, Search, Globe, Target, TrendingDown, Check, ArrowDown, Paperclip } from "lucide-react";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [isLoading]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    setIsProcessing(true);
    setShowResponse(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setCurrentResponse("Based on your La Doña regional performance data, I can see that Colón region is currently at 67% of target with some challenges in vinegar sales and delivery timelines. Would you like me to analyze the specific factors contributing to this performance gap?");
      setIsProcessing(false);
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
        {/* KPI Cards - Modern Clean Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4">
          {/* Daily Sales Target */}
          <div className="bg-white rounded-lg p-4 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-xs font-medium text-gray-600">Daily Sales Target</h3>
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">41%</div>
            <div className="text-left">
              <p className="text-xs text-gray-500">Target: 46%</p>
              <p className="text-xs text-gray-500">5% below expected daily pace</p>
            </div>
          </div>

          {/* Zones at Risk */}
          <div className="bg-white rounded-lg p-4 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-xs font-medium text-gray-600">Zones at Risk</h3>
            </div>
            <div className="text-2xl font-bold text-red-600 mb-1">3</div>
            <div className="text-left">
              <p className="text-xs text-gray-500">7 Reps</p>
              <p className="text-xs text-gray-500">Colón, Chiriquí, and Oeste below target</p>
            </div>
          </div>

          {/* El Extra Campaign */}
          <div className="bg-white rounded-lg p-4 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-xs font-medium text-gray-600">El Extra Campaign</h3>
            </div>
            <div className="text-2xl font-bold text-[#DAA520] mb-1">8.2%</div>
            <div className="text-left">
              <p className="text-xs text-gray-500">ROI</p>
              <p className="text-xs text-gray-500">$6,200 invested, recommend vinegar + aderezo combo</p>
            </div>
          </div>
        </div>

        {/* AI Assistant Chat */}
        <section className="bg-white rounded-xl shadow-md p-6 max-h-[70vh] overflow-y-auto space-y-4">
          
          {/* Vorta Logo */}
          <div className="flex justify-center mt-6 mb-4">
            <div className="vortex-icon">
              <div className="vortex-blade"></div>
              <div className="vortex-blade"></div>
              <div className="vortex-blade"></div>
              <div className="vortex-blade"></div>
              <div className="vortex-blade"></div>
              <div className="vortex-blade"></div>
            </div>
          </div>

          <div className="space-y-3">
            {/* Initial Assistant Greeting */}
            <div className="flex items-start gap-3 animate-[chatDrop_200ms_ease-out]">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="vortex-icon scale-75">
                  <div className="vortex-blade"></div>
                  <div className="vortex-blade"></div>
                  <div className="vortex-blade"></div>
                  <div className="vortex-blade"></div>
                  <div className="vortex-blade"></div>
                  <div className="vortex-blade"></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 rounded-xl px-4 py-3 inline-block max-w-md shadow-sm">
                  <p className="text-sm text-gray-700">How can I help you today?</p>
                </div>
              </div>
            </div>

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
                  className="bg-[#fafaf9] rounded-2xl shadow-[0_2px_6px_rgba(0,0,0,0.04)] border border-gray-200 p-6 transition-all duration-300 ease-in-out transform origin-top animate-[slideUp_0.3s_ease-out]"
                >
                  {/* Assistant Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`vortex-icon ${isProcessing ? 'active' : ''}`} style={{ width: '18px', height: '18px' }}>
                      <div className="vortex-blade"></div>
                      <div className="vortex-blade"></div>
                      <div className="vortex-blade"></div>
                      <div className="vortex-blade"></div>
                      <div className="vortex-blade"></div>
                      <div className="vortex-blade"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Vorta</span>
                  </div>

                  {/* Response Content */}
                  <div className="space-y-4">
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        <span className="text-gray-500 text-sm ml-2">Analyzing your data...</span>
                      </div>
                    ) : (
                      <p className="text-[15px] leading-relaxed text-gray-800">
                        {currentResponse}
                      </p>
                    )}
                  </div>

                  {/* Suggestions (when not processing) */}
                  {!isProcessing && currentResponse && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        <button className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
                          Show detailed breakdown
                        </button>
                        <button className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
                          Compare with other regions
                        </button>
                        <button className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
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



        {/* Horizontal Progress Pill Cards */}
        <section className="pb-6">
          <div className="flex gap-4 px-6">
            {/* Colón Region Card */}
            <div 
              className={`flex flex-col rounded-xl px-4 py-3 bg-white/80 shadow-xs border border-neutral-200 w-[260px] cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all duration-200 ${expandedCard === 'colon' ? 'ring-1 ring-red-400/50' : ''}`}
              onClick={() => setExpandedCard(expandedCard === 'colon' ? null : 'colon')}
              title="Colón: $4,150 of $6,200 goal achieved"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-base text-gray-800 flex-1">Colón</h3>
                <div className="px-2 py-0.5 text-red-600 bg-red-100 border border-red-200 rounded-full ml-2">
                  <span className="text-xs font-medium flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    At Risk
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-gray-900" />
                  <span className="text-sm text-gray-900">67% reached</span>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowDown className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-500">33% to goal</span>
                </div>
              </div>

              <div className="relative w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className="absolute h-full bg-red-500 rounded-full transition-all duration-300" 
                  style={{ width: '67%' }}
                ></div>
              </div>
            </div>

            {/* Oeste Region Card */}
            <div 
              className={`flex flex-col rounded-xl px-4 py-3 bg-white/80 shadow-xs border border-neutral-200 w-[260px] cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all duration-200 ${expandedCard === 'oeste' ? 'ring-1 ring-yellow-400/50' : ''}`}
              onClick={() => setExpandedCard(expandedCard === 'oeste' ? null : 'oeste')}
              title="Oeste: $6,660 of $9,000 goal achieved"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-base text-gray-800 flex-1">Oeste</h3>
                <div className="px-2 py-0.5 text-yellow-600 bg-yellow-100 border border-yellow-200 rounded-full ml-2">
                  <span className="text-xs font-medium flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Needs Attention
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-gray-900" />
                  <span className="text-sm text-gray-900">74% reached</span>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowDown className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-500">26% to goal</span>
                </div>
              </div>

              <div className="relative w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className="absolute h-full bg-yellow-500 rounded-full transition-all duration-300" 
                  style={{ width: '74%' }}
                ></div>
              </div>
            </div>

            {/* Chiriquí Region Card */}
            <div 
              className={`flex flex-col rounded-xl px-4 py-3 bg-white/80 shadow-xs border border-neutral-200 w-[260px] cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all duration-200 ${expandedCard === 'chiriqui' ? 'ring-1 ring-red-400/50' : ''}`}
              onClick={() => setExpandedCard(expandedCard === 'chiriqui' ? null : 'chiriqui')}
              title="Chiriquí: $5,040 of $7,000 goal achieved"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-base text-gray-800 flex-1">Chiriquí</h3>
                <div className="px-2 py-0.5 text-yellow-600 bg-yellow-100 border border-yellow-200 rounded-full ml-2">
                  <span className="text-xs font-medium flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Needs Attention
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-gray-900" />
                  <span className="text-sm text-gray-900">72% reached</span>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowDown className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-500">28% to goal</span>
                </div>
              </div>

              <div className="relative w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className="absolute h-full bg-yellow-500 rounded-full transition-all duration-300" 
                  style={{ width: '72%' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Expanded Dropdown Details */}
          {expandedCard === 'colon' && (
            <div className="mt-4 bg-white rounded-lg border border-gray-100 shadow-lg p-4 animate-[chatDrop_200ms_ease-out]">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-[14px] h-[14px] rounded-full bg-gradient-to-br from-red-400 to-red-600"></div>
                  <h3 className="text-lg font-semibold text-gray-900">Colón Region</h3>
                </div>
                <div className="text-sm text-gray-500">Updated 2h ago</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-700"><strong>Reps:</strong> María Santos, Carlos López, Ana Ruiz</p>
                  <p className="text-sm text-gray-700"><strong>Key Issues:</strong> Low vinegar sales, delayed deliveries</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700"><strong>Trend:</strong> ↓ 12% vs last month</p>
                  <p className="text-sm text-gray-700"><strong>Action:</strong> Focus on combo promotions</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-sm text-red-700">
                  <Phone className="w-4 h-4" />
                  Call Team Lead
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                  View Dashboard
                </button>
              </div>
            </div>
          )}

          {expandedCard === 'oeste' && (
            <div className="mt-4 bg-white rounded-lg border border-gray-100 shadow-lg p-4 animate-[chatDrop_200ms_ease-out]">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-[14px] h-[14px] rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600"></div>
                  <h3 className="text-lg font-semibold text-gray-900">Oeste Region</h3>
                </div>
                <div className="text-sm text-gray-500">Updated 1h ago</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-700"><strong>Reps:</strong> Diego Morales, Sofia Chen</p>
                  <p className="text-sm text-gray-700"><strong>Key Focus:</strong> Specialty sauces, premium line</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700"><strong>Trend:</strong> ↗ 6% vs last month</p>
                  <p className="text-sm text-gray-700"><strong>Action:</strong> Weekend promotions boost</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors text-sm text-yellow-700">
                  <Phone className="w-4 h-4" />
                  Call Team Lead
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                  View Dashboard
                </button>
              </div>
            </div>
          )}

          {expandedCard === 'chiriqui' && (
            <div className="mt-4 bg-white rounded-lg border border-gray-100 shadow-lg p-4 animate-[chatDrop_200ms_ease-out]">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-[14px] h-[14px] rounded-full bg-gradient-to-br from-red-400 to-red-600"></div>
                  <h3 className="text-lg font-semibold text-gray-900">Chiriquí Region</h3>
                </div>
                <div className="text-sm text-gray-500">Updated 3h ago</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-700"><strong>Reps:</strong> Roberto Vega, Lucia Fernandez</p>
                  <p className="text-sm text-gray-700"><strong>Key Issues:</strong> Supply chain delays, competitor pressure</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700"><strong>Trend:</strong> ↓ 18% vs last month</p>
                  <p className="text-sm text-gray-700"><strong>Action:</strong> Emergency logistics coordination</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-sm text-red-700">
                  <Phone className="w-4 h-4" />
                  Call Team Lead
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                  View Dashboard
                </button>
              </div>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
