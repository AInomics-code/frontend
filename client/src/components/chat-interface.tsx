import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { Menu, TrendingUp, AlertTriangle, Star, Mic, Send, BarChart3, User, Phone, Package, MapPin, ArrowRight, Search, Globe } from "lucide-react";
import vortexLogo from "@assets/Screenshot 2025-05-26 alle 13.53.01.png";
import laDonaLogo from "@assets/Screenshot 2025-05-19 alle 15.08.46.png";

export function ChatInterface() {
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [isLoading]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    setIsLoading(true);
    // Simulate assistant thinking time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setInputValue("");
  };

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
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
              <div className="flex items-center gap-3 text-gray-400">
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
                className="px-4 py-2 rounded-lg bg-[#E10600] text-white text-sm font-medium shadow-md hover:bg-[#cc0500] hover:scale-[1.03] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
              >
                Ask
              </button>
            </div>
          </div>
        </section>



        {/* Refined Alert Tags */}
        <section className="px-6 pb-6">
          <div className="flex flex-wrap gap-3 justify-start">
            {/* Colón Region Alert */}
            <div 
              className={`flex items-center justify-between rounded-xl bg-white px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200 min-w-[200px] max-w-[220px] h-[48px] cursor-pointer hover:scale-[1.02] ${expandedCard === 'colon' ? 'ring-1 ring-red-400/50' : ''}`}
              style={{ boxShadow: expandedCard === 'colon' ? 'inset 0 1px 2px rgba(0,0,0,0.03)' : undefined }}
              onClick={() => setExpandedCard(expandedCard === 'colon' ? null : 'colon')}
              title="Region below sales target – 3 reps affected"
            >
              <div className="flex items-center gap-3">
                <div className="w-[14px] h-[14px] rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-red-300/50"></div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Colón</div>
                  <div className="text-xs text-gray-500">67% of goal</div>
                </div>
              </div>
              <div className="text-gray-400 hover:text-red-400 text-sm cursor-pointer transition-colors duration-200 hover:scale-110">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Oeste Region Alert */}
            <div 
              className={`flex items-center justify-between rounded-xl bg-white px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200 min-w-[200px] max-w-[220px] h-[48px] cursor-pointer hover:scale-[1.02] ${expandedCard === 'oeste' ? 'ring-1 ring-yellow-400/50' : ''}`}
              style={{ boxShadow: expandedCard === 'oeste' ? 'inset 0 1px 2px rgba(0,0,0,0.03)' : undefined }}
              onClick={() => setExpandedCard(expandedCard === 'oeste' ? null : 'oeste')}
              title="Region approaching sales target – 2 reps affected"
            >
              <div className="flex items-center gap-3">
                <div className="w-[14px] h-[14px] rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-yellow-300/50"></div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Oeste</div>
                  <div className="text-xs text-gray-500">74% of goal</div>
                </div>
              </div>
              <div className="text-gray-400 hover:text-yellow-500 text-sm cursor-pointer transition-colors duration-200 hover:scale-110">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Chiriquí Region Alert */}
            <div 
              className={`flex items-center justify-between rounded-xl bg-white px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200 min-w-[200px] max-w-[220px] h-[48px] cursor-pointer hover:scale-[1.02] ${expandedCard === 'chiriqui' ? 'ring-1 ring-red-400/50' : ''}`}
              style={{ boxShadow: expandedCard === 'chiriqui' ? 'inset 0 1px 2px rgba(0,0,0,0.03)' : undefined }}
              onClick={() => setExpandedCard(expandedCard === 'chiriqui' ? null : 'chiriqui')}
              title="Critical region – supply chain delays affecting 2 reps"
            >
              <div className="flex items-center gap-3">
                <div className="w-[14px] h-[14px] rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-red-300/50"></div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Chiriquí</div>
                  <div className="text-xs text-gray-500">72% of goal</div>
                </div>
              </div>
              <div className="text-gray-400 hover:text-red-400 text-sm cursor-pointer transition-colors duration-200 hover:scale-110">
                <ArrowRight className="w-4 h-4" />
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
