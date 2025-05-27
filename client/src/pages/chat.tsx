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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-gray-100/20 backdrop-blur-3xl"></div>
      
      {/* Top Header */}
      <div className="relative z-10 flex justify-between items-center p-6">
        <img 
          src={laDonaLogo} 
          alt="La Doña" 
          className="h-6 opacity-60"
        />
        
        {/* Notification Bell */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-white/50"
          >
            <Bell className="w-4 h-4 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 p-4 animate-[fadeInUp_0.3s_ease-out]">
              <h3 className="font-semibold text-gray-800 mb-3">Business Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">●</span>
                    <span className="text-sm text-red-700">3 zones at risk</span>
                  </div>
                  <span className="text-xs text-red-600">High</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500">●</span>
                    <span className="text-sm text-orange-700">2 SKUs in backorder</span>
                  </div>
                  <span className="text-xs text-orange-600">Medium</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
        {/* Floating Chat Box */}
        <div className="w-full max-w-3xl mx-auto">
          {/* Messages Area */}
          <div className="mb-6 space-y-4 max-h-[60vh] overflow-y-auto">
            {messages.length === 0 && !isTyping && (
              <div className="text-center py-8">
                <div className="mb-6">
                  <h1 className="text-2xl font-light text-gray-700 mb-2">Ask Vorta anything</h1>
                  <p className="text-gray-400 text-sm">Your business intelligence assistant</p>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-[slideUp_0.3s_ease-out]`}
              >
                <div
                  className={`max-w-[75%] p-4 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg group ${
                    message.isUser
                      ? 'bg-[#E10600] text-white'
                      : 'bg-white/90 backdrop-blur-md border border-white/50'
                  }`}
                  style={{
                    animation: 'messageAppear 0.3s ease-out'
                  }}
                >
                  <p className={`text-base leading-relaxed ${message.isUser ? 'text-white' : 'text-gray-800'}`}>
                    {message.content}
                  </p>
                  
                  {/* Message Utilities */}
                  {!message.isUser && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-2 flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                        <Copy className="w-3 h-3" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                        <Expand className="w-3 h-3" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                        <Pin className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-[slideUp_0.3s_ease-out]">
                <div className="bg-white/90 backdrop-blur-md border border-white/50 rounded-2xl p-4 shadow-md flex items-center gap-3">
                  {/* Vorta Logo with Animation */}
                  <div className="vortex-icon active" style={{ width: '16px', height: '16px', filter: 'drop-shadow(0 0 8px rgba(225, 6, 0, 0.4))' }}>
                    <div className="vortex-blade"></div>
                    <div className="vortex-blade"></div>
                    <div className="vortex-blade"></div>
                    <div className="vortex-blade"></div>
                    <div className="vortex-blade"></div>
                    <div className="vortex-blade"></div>
                  </div>
                  
                  {/* Typing Dots */}
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Floating Input Area */}
          <div className="relative">
            <div className="bg-white/90 backdrop-blur-md border border-white/50 rounded-3xl shadow-xl focus-within:shadow-2xl focus-within:ring-2 focus-within:ring-[#E10600]/20 transition-all duration-300 p-4">
              {/* Suggested Prompts Dropdown */}
              {(showSuggestions || isFocused) && !inputValue && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-3 max-h-64 overflow-y-auto animate-[fadeInUp_0.3s_ease-out]">
                  <div className="text-xs text-gray-500 mb-2 font-medium">Suggested prompts</div>
                  <div className="space-y-1">
                    {suggestedPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputValue(prompt);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors text-sm text-gray-700"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                      setIsFocused(true);
                      setShowSuggestions(true);
                    }}
                    onBlur={() => {
                      setIsFocused(false);
                      setTimeout(() => setShowSuggestions(false), 150);
                    }}
                    placeholder="Ask about KPIs, performance trends, or product insights..."
                    className="w-full resize-none bg-transparent outline-none text-gray-800 placeholder-gray-400 text-base leading-relaxed min-h-[20px] max-h-32"
                    rows={1}
                    style={{
                      height: 'auto',
                      minHeight: '20px'
                    }}
                  />
                </div>
                
                {/* Input Icons */}
                <div className="flex items-center gap-1 text-gray-400">
                  <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200" title="Attach files">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200" title="Language settings">
                    <Globe className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setIsVoiceActive(!isVoiceActive)}
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      isVoiceActive 
                        ? 'bg-red-100 text-red-600 shadow-[0_0_12px_rgba(225,6,0,0.4)] animate-pulse' 
                        : 'hover:bg-gray-100'
                    }`}
                    title="Voice input"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                  
                  {/* Send Button - iOS Style */}
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className={`px-4 py-2 rounded-full transition-all duration-200 font-medium text-sm ${
                      inputValue.trim() && !isTyping
                        ? 'bg-[#E10600] text-white hover:bg-[#cc0500] hover:scale-105 shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isTyping ? '...' : 'Ask'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}