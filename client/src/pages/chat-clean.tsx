import { useState, useRef, useEffect } from "react";
import { Paperclip, Globe, Mic, Send, Copy, Expand, Pin, Bell, Home, BarChart2, Settings, LogOut, User } from "lucide-react";
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

  return (
    <div className="flex h-screen bg-white">
      
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 p-6 flex flex-col">
        {/* Logo */}
        <img 
          src={laDonaLogo} 
          className="w-24 mb-4" 
          alt="La Doña logo" 
        />
        
        {/* Title */}
        <h1 className="text-lg font-semibold text-gray-800 leading-tight mb-8">
          La Doña<br />
          Business<br />
          Intelligence
        </h1>

        {/* User Info */}
        <div className="mb-8">
          <div className="font-medium text-gray-900 text-sm">Carlos Mendoza</div>
          <div className="text-xs text-gray-500">General Manager</div>
        </div>

        {/* Logout Button */}
        <button className="mt-auto text-sm text-red-500 hover:text-red-700 transition-colors self-start">
          Logout →
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-10">
        
        {/* Vorta Logo */}
        {messages.length === 0 && !isTyping && (
          <div className="vortex-icon animate-pulse mb-4" style={{ width: '32px', height: '32px' }}>
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
          </div>
        )}

        {/* Messages Area */}
        {messages.length > 0 && (
          <div className="mb-8 space-y-6 max-h-[60vh] overflow-y-auto w-full max-w-3xl">
            {messages.map((message) => (
              <div key={message.id} className="animate-[fadeIn_0.3s_ease-out]">
                {message.isUser ? (
                  <div className="text-xl text-gray-800 font-medium mb-4">
                    {message.content}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="vortex-icon active" style={{ width: '14px', height: '14px' }}>
                        <div className="vortex-blade"></div>
                        <div className="vortex-blade"></div>
                        <div className="vortex-blade"></div>
                        <div className="vortex-blade"></div>
                        <div className="vortex-blade"></div>
                        <div className="vortex-blade"></div>
                      </div>
                      <span>Vorta</span>
                    </div>
                    <div className="text-gray-800 leading-relaxed">
                      {message.content}
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
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <div className="vortex-icon active" style={{ width: '14px', height: '14px' }}>
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
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}

        {/* Chat Input */}
        <div className="w-full max-w-3xl bg-white border border-gray-200 shadow-md rounded-full px-6 py-4 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Ask about KPIs or performance..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <Globe className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsVoiceActive(!isVoiceActive)}
            className={`transition-colors ${isVoiceActive ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Mic className="w-5 h-5" />
          </button>
          <button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className={`ml-2 rounded-full px-4 py-2 transition-colors ${
              inputValue.trim() 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-red-300 text-white opacity-50 cursor-not-allowed'
            }`}
          >
            Ask
          </button>
        </div>

        <div ref={messagesEndRef} />
      </main>
    </div>
  );
}