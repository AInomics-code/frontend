import { useState, useRef, useEffect } from "react";
import { Paperclip, Globe, Mic, Send, Copy, Expand, Pin, Bell } from "lucide-react";
import laDonaLogo from "@assets/Screenshot 2025-05-19 alle 15.08.46.png";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Based on your La Doña sales data, I can see several areas requiring attention. The Colón region shows a 33% gap to target, primarily due to declining vinegar sales and delivery delays. Would you like me to provide a detailed breakdown of the underperforming SKUs or suggest specific action items?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedPrompts = [
    "Which products underperformed last week?",
    "Show me current inventory gaps by region", 
    "What are the top-selling SKUs this month?",
    "Analyze delivery performance trends",
    "Compare sales targets vs actual results",
    "Which stores need immediate attention?",
    "Show competitor pricing analysis",
    "What's driving the revenue decline in Colón?"
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white relative">
      {/* Top Logo Container */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-3">
          <img 
            src={laDonaLogo} 
            alt="La Doña" 
            className="h-12"
          />
          {/* Vorta Icon */}
          <div className="vortex-icon active" style={{ width: '24px', height: '24px', filter: 'drop-shadow(0 0 8px rgba(240, 44, 44, 0.4))' }}>
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
          </div>
        </div>
      </div>

      {/* Alert Bell - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-200 relative"
        >
          <Bell className="w-5 h-5 text-gray-400" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </button>
        
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-64 bg-[#1c1c1c] rounded-lg shadow-xl border border-[#2a2a2a] p-3 animate-[fadeInUp_0.2s_ease-out]">
            <div className="text-xs text-gray-400 mb-2 font-medium">Business Alerts</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-red-400">3 Zones Below Target</span>
                <span className="text-xs text-red-500">●</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-orange-400">2 SKUs Missing</span>
                <span className="text-xs text-orange-500">●</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Container - Centered */}
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-[650px]">
          
          {/* Messages Area */}
          {messages.length > 0 && (
            <div className="mb-8 space-y-6 max-h-[60vh] overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className="animate-[fadeIn_0.3s_ease-out]">
                  {message.isUser ? (
                    /* User Message - Simple Text */
                    <div className="text-xl text-white font-medium mb-4">
                      {message.content}
                    </div>
                  ) : (
                    /* AI Response */
                    <div className="space-y-4">
                      {/* Vorta Logo - Only appears with responses */}
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="vortex-icon active" style={{ width: '14px', height: '14px', filter: 'drop-shadow(0 0 6px rgba(240, 44, 44, 0.3))' }}>
                          <div className="vortex-blade"></div>
                          <div className="vortex-blade"></div>
                          <div className="vortex-blade"></div>
                          <div className="vortex-blade"></div>
                          <div className="vortex-blade"></div>
                          <div className="vortex-blade"></div>
                        </div>
                        <span>Vorta</span>
                      </div>
                      
                      {/* Response Content */}
                      <div className="text-white leading-relaxed">
                        {message.content}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-4">
                        <button className="px-4 py-2 bg-[#1c1c1c] hover:bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg text-sm text-gray-300 transition-colors">
                          View SKU List
                        </button>
                        <button className="px-4 py-2 bg-[#1c1c1c] hover:bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg text-sm text-gray-300 transition-colors">
                          Compare Chains
                        </button>
                        <button className="px-4 py-2 bg-[#1c1c1c] hover:bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg text-sm text-gray-300 transition-colors">
                          View Dashboard
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="mb-8 animate-[fadeIn_0.3s_ease-out]">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <div className="vortex-icon active" style={{ width: '14px', height: '14px', filter: 'drop-shadow(0 0 6px rgba(240, 44, 44, 0.3))' }}>
                  <div className="vortex-blade"></div>
                  <div className="vortex-blade"></div>
                  <div className="vortex-blade"></div>
                  <div className="vortex-blade"></div>
                  <div className="vortex-blade"></div>
                  <div className="vortex-blade"></div>
                </div>
                <span>Vorta</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}

          {/* Chat Input Area - Dark Theme Style */}
          <div className="bg-[#1c1c1c] rounded-[14px] p-3 border border-[#2a2a2a] shadow-lg">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Ask about KPIs or performance..."
                className="flex-1 bg-transparent border-none outline-none text-white text-base placeholder-gray-400"
              />
              
              {/* Icons */}
              <div className="flex items-center gap-2 text-gray-400">
                <button 
                  className="p-1 hover:text-gray-300 transition-colors" 
                  title="Attach files"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                
                <button 
                  className="p-1 hover:text-gray-300 transition-colors" 
                  title="Language"
                >
                  <Globe className="w-4 h-4" />
                </button>
                
                <button 
                  onClick={() => setIsVoiceActive(!isVoiceActive)}
                  className={`p-1 transition-all duration-200 ${
                    isVoiceActive 
                      ? 'text-[#f02c2c] shadow-[0_0_10px_rgba(240,44,44,0.4)] animate-pulse' 
                      : 'hover:text-gray-300'
                  }`}
                  title="Voice input"
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>
              
              {/* Ask Button */}
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className={`bg-[#f02c2c] hover:bg-[#e32222] text-white font-bold px-4 py-2 rounded-lg transition-all duration-200 ${
                  !inputValue.trim() || isTyping ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Ask
              </button>
            </div>
          </div>

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}