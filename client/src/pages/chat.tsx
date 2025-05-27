import { useState, useRef, useEffect } from "react";
import { Paperclip, Globe, Mic, Send, Copy, Expand, Pin, Bell } from "lucide-react";

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

  const suggestions = [
    "Show today's sales gap",
    "Which SKUs are out of stock?",
    "Analyze underperforming regions",
    "Compare this month vs last month"
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Notification Bell */}
      <div className="absolute top-6 right-6 z-10">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-4 animate-[fadeInUp_0.3s_ease-out]">
              <h3 className="font-semibold text-gray-800 mb-3">Alert Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-red-600">
                  <span>❗</span>
                  <span>3 Zones at Risk</span>
                </div>
                <div className="flex items-center gap-2 text-orange-600">
                  <span>🧃</span>
                  <span>12 SKUs Missing</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-600">
                  <span>🪙</span>
                  <span>5 Underperforming Campaigns</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-8">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-4">
          {messages.length === 0 && !isTyping && (
            <div className="text-center py-12">
              <div className="mb-8">
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">Welcome to Vorta</h1>
                <p className="text-gray-500">Your AI assistant for La Doña business intelligence</p>
              </div>
              
              {/* Smart Suggestions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(suggestion)}
                    className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                  >
                    <span className="text-gray-700">{suggestion}</span>
                  </button>
                ))}
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
                    : 'bg-white border border-gray-100'
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
              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-md flex items-center gap-3">
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

        {/* Input Area */}
        <div className="relative">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg focus-within:shadow-xl focus-within:ring-2 focus-within:ring-[#E10600]/20 transition-all duration-300 p-4">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about sales gaps, missing SKUs, or underperforming stores…"
                  className="w-full resize-none bg-transparent outline-none text-gray-800 placeholder-gray-400 text-base leading-relaxed min-h-[20px] max-h-32"
                  rows={1}
                  style={{
                    height: 'auto',
                    minHeight: '20px'
                  }}
                />
              </div>
              
              {/* Input Icons */}
              <div className="flex items-center gap-2 text-gray-400">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200" title="Attach files">
                  <Paperclip className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200" title="Language settings">
                  <Globe className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsVoiceActive(!isVoiceActive)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    isVoiceActive 
                      ? 'bg-red-100 text-red-600 shadow-[0_0_8px_rgba(225,6,0,0.3)]' 
                      : 'hover:bg-gray-100'
                  }`}
                  title="Voice input"
                >
                  <Mic className="w-4 h-4" />
                </button>
                
                {/* Send Button */}
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    inputValue.trim() && !isTyping
                      ? 'bg-[#E10600] text-white hover:bg-[#cc0500] hover:scale-105 shadow-md hover:shadow-lg'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}