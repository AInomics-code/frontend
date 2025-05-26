import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { Menu, TrendingUp, AlertTriangle, Star, Mic, Send, BarChart3, User, Phone, Package, MapPin } from "lucide-react";
import vortexLogo from "@assets/Screenshot 2025-05-26 alle 13.53.01.png";
import laDonaLogo from "@assets/Screenshot 2025-05-19 alle 15.08.46.png";

export function ChatInterface() {
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [isLoading]);

  const handleSendMessage = () => {
    setIsLoading(true);
    // Simulate assistant thinking time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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

          {/* Input Area */}
          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Ask about KPIs or sales performance..."
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006400] focus:border-transparent"
              />
            </div>
            <button 
              aria-label="Voice input"
              title="Hold to speak"
              className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:shadow-md hover:border-gray-200 transition-all duration-300 group"
            >
              <Mic className="w-4 h-4 text-[#D71920] group-hover:text-red-600 transition-colors duration-200" />
            </button>
            <button 
              onClick={handleSendMessage}
              className="w-10 h-10 bg-[#D71920] rounded-full text-white flex items-center justify-center shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-200 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Interactive Alert Cards - Below Chat Interface */}
        <section className="space-y-4">
          <div className="flex flex-row justify-start gap-4 mt-6 px-4">
            {/* Colón Region Card */}
            <div 
              className={`bg-white rounded-xl shadow-sm px-4 py-3 min-w-[220px] max-w-[240px] h-[56px] cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200 ease-in-out ${expandedCard === 'colon' ? 'ring-2 ring-red-200' : ''}`}
              style={{ boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.06)' }}
              onClick={() => setExpandedCard(expandedCard === 'colon' ? null : 'colon')}
              title="Region below sales target – 3 reps affected"
            >
              <div className="flex items-center justify-between h-full">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-red-500 text-base">🔴</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800">Colón</div>
                    <div className="text-xs text-gray-500">67% of goal</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-400 italic">Click for detail</span>
                </div>
              </div>
            </div>

            {/* Oeste Region Card */}
            <div 
              className={`bg-white rounded-xl shadow-sm px-4 py-3 min-w-[220px] max-w-[240px] h-[56px] cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200 ease-in-out ${expandedCard === 'oeste' ? 'ring-2 ring-yellow-200' : ''}`}
              style={{ boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.06)' }}
              onClick={() => setExpandedCard(expandedCard === 'oeste' ? null : 'oeste')}
              title="Region approaching sales target – 2 reps affected"
            >
              <div className="flex items-center justify-between h-full">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-yellow-500 text-base">🟡</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800">Oeste</div>
                    <div className="text-xs text-gray-500">74% of goal</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-gray-400 italic">Click for detail</span>
                </div>
              </div>
            </div>

            {/* Chiriquí Region Card */}
            <div 
              className={`bg-white rounded-xl shadow-sm px-4 py-3 min-w-[220px] max-w-[240px] h-[56px] cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200 ease-in-out ${expandedCard === 'chiriqui' ? 'ring-2 ring-red-200' : ''}`}
              style={{ boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.06)' }}
              onClick={() => setExpandedCard(expandedCard === 'chiriqui' ? null : 'chiriqui')}
              title="Critical region – supply chain delays affecting 2 reps"
            >
              <div className="flex items-center justify-between h-full">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-red-500 text-base">🔴</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800">Chiriquí</div>
                    <div className="text-xs text-gray-500">72% of goal</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-400 italic">Click for detail</span>
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Detail Cards */}
          {expandedCard === 'colon' && (
              <div className="bg-red-50 border-t-[3px] border-red-500 rounded-xl px-6 py-4 max-h-[280px] opacity-100 transition-all duration-300 animate-[chatDrop_200ms_ease-out]">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <h3 className="text-lg font-semibold text-gray-800">Colón Region</h3>
                  </div>
                  <div className="text-sm text-gray-500">Updated 2h ago</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700"><strong>Current Performance:</strong> 67% of monthly goal</p>
                    <p className="text-sm text-gray-700"><strong>Reps Affected:</strong> 3 sales representatives</p>
                    <p className="text-sm text-gray-700"><strong>Key Issues:</strong> Low vinegar sales, delayed aderezo deliveries</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700"><strong>Recommendation:</strong> Focus on combo promotions</p>
                    <p className="text-sm text-gray-700"><strong>Priority SKUs:</strong> Extra Virgin, Classic Vinegar</p>
                    <p className="text-sm text-gray-700"><strong>Next Review:</strong> Tomorrow 9:00 AM</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Phone className="w-4 h-4" />
                    Contact Team Lead
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <BarChart3 className="w-4 h-4" />
                    View Sales Data
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Package className="w-4 h-4" />
                    Check Inventory
                  </button>
                </div>
              </div>
            )}

            {expandedCard === 'oeste' && (
              <div className="bg-yellow-50 border-t-[3px] border-yellow-500 rounded-xl px-6 py-4 max-h-[280px] opacity-100 transition-all duration-300 animate-[chatDrop_200ms_ease-out]">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-yellow-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Oeste Region</h3>
                  </div>
                  <div className="text-sm text-gray-500">Updated 1h ago</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700"><strong>Current Performance:</strong> 74% of monthly goal</p>
                    <p className="text-sm text-gray-700"><strong>Reps Affected:</strong> 2 sales representatives</p>
                    <p className="text-sm text-gray-700"><strong>Key Issues:</strong> Seasonal demand fluctuation</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700"><strong>Recommendation:</strong> Increase weekend promotions</p>
                    <p className="text-sm text-gray-700"><strong>Priority SKUs:</strong> Specialty Sauces, Premium Line</p>
                    <p className="text-sm text-gray-700"><strong>Next Review:</strong> Wednesday 2:00 PM</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Phone className="w-4 h-4" />
                    Contact Team Lead
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <BarChart3 className="w-4 h-4" />
                    View Sales Data
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Package className="w-4 h-4" />
                    Check Inventory
                  </button>
                </div>
              </div>
            )}

            {expandedCard === 'chiriqui' && (
              <div className="bg-red-50 border-t-[3px] border-red-500 rounded-xl px-6 py-4 max-h-[280px] opacity-100 transition-all duration-300 animate-[chatDrop_200ms_ease-out]">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <h3 className="text-lg font-semibold text-gray-800">Chiriquí Region</h3>
                  </div>
                  <div className="text-sm text-gray-500">Updated 3h ago</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700"><strong>Current Performance:</strong> 72% of monthly goal</p>
                    <p className="text-sm text-gray-700"><strong>Reps Affected:</strong> 2 sales representatives</p>
                    <p className="text-sm text-gray-700"><strong>Key Issues:</strong> Supply chain delays, competitor pressure</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700"><strong>Recommendation:</strong> Emergency stock redistribution</p>
                    <p className="text-sm text-gray-700"><strong>Priority SKUs:</strong> Core Vinegar, Basic Aderezo</p>
                    <p className="text-sm text-gray-700"><strong>Next Review:</strong> Today 4:00 PM</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Phone className="w-4 h-4" />
                    Contact Team Lead
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <BarChart3 className="w-4 h-4" />
                    View Sales Data
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Package className="w-4 h-4" />
                    Check Inventory
                  </button>
                </div>
              </div>
            )}
        </section>

        {/* Interactive Alert Cards - Below Chat Interface */}
        <section className="space-y-4">
          <div className="flex flex-row justify-start gap-4 mt-6 px-4">
            {/* Colón Region Card */}
            <div 
              className={`bg-white rounded-xl shadow-sm px-4 py-3 min-w-[220px] max-w-[240px] h-[56px] cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200 ease-in-out ${expandedCard === 'colon' ? 'ring-2 ring-red-200' : ''}`}
              style={{ boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.06)' }}
              onClick={() => setExpandedCard(expandedCard === 'colon' ? null : 'colon')}
              title="Region below sales target – 3 reps affected"
            >
              <div className="flex items-center justify-between h-full">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-red-500 text-base">🔴</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800">Colón</div>
                    <div className="text-xs text-gray-500">67% of goal</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-400 italic">Click for detail</span>
                </div>
              </div>
            </div>

            {/* Oeste Region Card */}
            <div 
              className={`bg-white rounded-xl shadow-sm px-4 py-3 min-w-[220px] max-w-[240px] h-[56px] cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200 ease-in-out ${expandedCard === 'oeste' ? 'ring-2 ring-yellow-200' : ''}`}
              style={{ boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.06)' }}
              onClick={() => setExpandedCard(expandedCard === 'oeste' ? null : 'oeste')}
              title="Region approaching sales target – 2 reps affected"
            >
              <div className="flex items-center justify-between h-full">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-yellow-500 text-base">🟡</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800">Oeste</div>
                    <div className="text-xs text-gray-500">74% of goal</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-gray-400 italic">Click for detail</span>
                </div>
              </div>
            </div>

            {/* Chiriquí Region Card */}
            <div 
              className={`bg-white rounded-xl shadow-sm px-4 py-3 min-w-[220px] max-w-[240px] h-[56px] cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200 ease-in-out ${expandedCard === 'chiriqui' ? 'ring-2 ring-red-200' : ''}`}
              style={{ boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.06)' }}
              onClick={() => setExpandedCard(expandedCard === 'chiriqui' ? null : 'chiriqui')}
              title="Critical region – supply chain delays affecting 2 reps"
            >
              <div className="flex items-center justify-between h-full">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-red-500 text-base">🔴</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800">Chiriquí</div>
                    <div className="text-xs text-gray-500">72% of goal</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-400 italic">Click for detail</span>
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Detail Cards */}
          {expandedCard === 'colon' && (
            <div className="bg-red-50 rounded-xl px-6 py-4 max-h-[220px] opacity-100 transition-all duration-300 ease-in-out mx-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Colón Region</h3>
                </div>
                <div className="text-sm text-gray-500">Updated 2h ago</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-700"><strong>SKU Delays:</strong> Extra Virgin, Classic Vinegar</p>
                  <p className="text-sm text-gray-700"><strong>Reps Affected:</strong> 3 sales representatives</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-700"><strong>Action:</strong> Emergency stock redistribution</p>
                  <p className="text-sm text-gray-700"><strong>Next Review:</strong> Tomorrow 9:00 AM</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <Phone className="w-4 h-4" />
                  Contact Team
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  View in dashboard
                </button>
              </div>
            </div>
          )}

          {expandedCard === 'oeste' && (
            <div className="bg-yellow-50 rounded-xl px-6 py-4 max-h-[220px] opacity-100 transition-all duration-300 ease-in-out mx-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Oeste Region</h3>
                </div>
                <div className="text-sm text-gray-500">Updated 1h ago</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-700"><strong>SKU Focus:</strong> Specialty Sauces, Premium Line</p>
                  <p className="text-sm text-gray-700"><strong>Reps Affected:</strong> 2 sales representatives</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-700"><strong>Action:</strong> Weekend promotions boost</p>
                  <p className="text-sm text-gray-700"><strong>Next Review:</strong> Wednesday 2:00 PM</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <Phone className="w-4 h-4" />
                  Contact Team
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  View in dashboard
                </button>
              </div>
            </div>
          )}

          {expandedCard === 'chiriqui' && (
            <div className="bg-red-50 rounded-xl px-6 py-4 max-h-[220px] opacity-100 transition-all duration-300 ease-in-out mx-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Chiriquí Region</h3>
                </div>
                <div className="text-sm text-gray-500">Updated 3h ago</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-700"><strong>SKU Issues:</strong> Supply chain delays</p>
                  <p className="text-sm text-gray-700"><strong>Reps Affected:</strong> 2 sales representatives</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-700"><strong>Action:</strong> Emergency logistics coordination</p>
                  <p className="text-sm text-gray-700"><strong>Next Review:</strong> Today 4:00 PM</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <Phone className="w-4 h-4" />
                  Contact Team
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  View in dashboard
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
