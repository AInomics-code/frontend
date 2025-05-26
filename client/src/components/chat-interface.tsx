import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { Menu } from "lucide-react";

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
            <img
              src={new URL('../assets/la-dona-logo.png', import.meta.url).href}
              alt="La Doña Logo"
              className="h-10 w-auto object-contain"
            />
            <h1 className="text-[#E50914] font-bold text-lg">
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
        {/* KPI Cards - Compact Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Daily Sales Target */}
          <div className="bg-[#F0FFF4] rounded-lg p-3 shadow-[0_1px_4px_rgba(0,0,0,0.05)] border border-green-100">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-lg">📊</span>
              <h3 className="text-xs font-medium text-gray-600">Daily Sales Target</h3>
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">41%</div>
            <p className="text-xs text-gray-500">Target: 46%</p>
            <p className="text-xs text-gray-500">5% below expected daily pace</p>
          </div>

          {/* Zones at Risk */}
          <div className="bg-[#FFF5F5] rounded-lg p-3 shadow-[0_1px_4px_rgba(0,0,0,0.05)] border border-red-100">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-lg">📉</span>
              <h3 className="text-xs font-medium text-gray-600">Zones at Risk</h3>
            </div>
            <div className="text-2xl font-bold text-red-600 mb-1">3</div>
            <p className="text-xs text-gray-500">7 Reps</p>
            <p className="text-xs text-gray-500">Colón, Chiriquí, and Oeste below target</p>
          </div>

          {/* El Extra Campaign */}
          <div className="bg-[#FFFBEF] rounded-lg p-3 shadow-[0_1px_4px_rgba(0,0,0,0.05)] border border-yellow-100">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-lg">⭐</span>
              <h3 className="text-xs font-medium text-gray-600">El Extra Campaign</h3>
            </div>
            <div className="text-2xl font-bold text-[#DAA520] mb-1">8.2%</div>
            <p className="text-xs text-gray-500">ROI</p>
            <p className="text-xs text-gray-500">$6,200 invested, recommend vinegar + aderezo combo</p>
          </div>
        </div>

        {/* Doña Assistant Section */}
        <section className="bg-white rounded-xl shadow-md p-6 max-h-[70vh] overflow-y-auto space-y-4">
          <h2 className="text-xl font-semibold text-[#006400] mb-4">Doña Assistant</h2>
          
          <div className="space-y-4">
            {/* Initial Assistant Greeting */}
            <div className="flex items-start gap-3">
              <img 
                src={new URL('../assets/la-dona-logo.png', import.meta.url).href}
                alt="La Doña Avatar" 
                className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1"
              />
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg px-4 py-3 inline-block max-w-md shadow-sm">
                  <p className="text-gray-700 text-sm">How can I help you today?</p>
                </div>
              </div>
            </div>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-3">
                <img 
                  src={new URL('../assets/la-dona-logo.png', import.meta.url).href}
                  alt="La Doña Avatar" 
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1"
                />
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg px-4 py-3 inline-block shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-sm">Doña is preparing insights</span>
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
