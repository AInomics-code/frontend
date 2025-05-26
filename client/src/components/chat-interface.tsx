import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { Menu, TrendingUp, AlertTriangle, Star } from "lucide-react";

export function ChatInterface() {
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
            <div className="vortex-icon idle">
              <div className="vortex-segment"></div>
              <div className="vortex-segment"></div>
              <div className="vortex-segment"></div>
              <div className="vortex-segment"></div>
              <div className="vortex-segment"></div>
              <div className="vortex-segment"></div>
            </div>
            <h1 className="text-gray-700 font-semibold text-lg">
              La Doña Business Intelligence
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">GM</span>
              </div>
              <span className="text-gray-700 text-sm">General Manager</span>
            </div>
            <button className="text-gray-500 text-sm flex items-center gap-1">
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
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <h3 className="text-xs font-medium text-gray-600">Daily Sales Target</h3>
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">41%</div>
            <div className="text-left">
              <p className="text-xs text-gray-500">Target: 46%</p>
              <p className="text-xs text-gray-500">5% below expected daily pace</p>
            </div>
          </div>

          {/* Zones at Risk */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <h3 className="text-xs font-medium text-gray-600">Zones at Risk</h3>
            </div>
            <div className="text-2xl font-bold text-red-600 mb-1">3</div>
            <div className="text-left">
              <p className="text-xs text-gray-500">7 Reps</p>
              <p className="text-xs text-gray-500">Colón, Chiriquí, and Oeste below target</p>
            </div>
          </div>

          {/* El Extra Campaign */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-600" />
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
          
          <div className="space-y-3">
            {/* Initial Assistant Greeting */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="vortex-icon idle">
                  <div className="vortex-segment"></div>
                  <div className="vortex-segment"></div>
                  <div className="vortex-segment"></div>
                  <div className="vortex-segment"></div>
                  <div className="vortex-segment"></div>
                  <div className="vortex-segment"></div>
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
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="vortex-icon active">
                    <div className="vortex-segment"></div>
                    <div className="vortex-segment"></div>
                    <div className="vortex-segment"></div>
                    <div className="vortex-segment"></div>
                    <div className="vortex-segment"></div>
                    <div className="vortex-segment"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-xl px-4 py-3 inline-block shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-sm">Preparing insights</span>
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      </div>
                    </div>
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
              onClick={handleSendMessage}
              className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center hover:scale-105 hover:bg-[#E6C200] transition-all duration-200 shadow-sm"
            >
              <svg 
                className="w-4 h-4 text-gray-700" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                />
              </svg>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
