import { useState, useRef, useEffect } from "react";
import { Paperclip, Globe, Mic, Search, BarChart2 } from "lucide-react";

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
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top KPI Dashboard - Elegant Layout */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-6">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Most Relevant Insights</h3>
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Performance Card */}
          <div className="bg-white rounded-xl shadow-sm p-5 w-full max-w-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-full bg-green-100">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10l6 6L18 4" />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-green-700">Performance</h4>
            </div>
            <ul className="text-sm text-gray-800 space-y-2">
              <li>
                <strong>Sales vs Target:</strong> 82% of monthly goal achieved
              </li>
              <li>
                <strong>Top-Selling SKU:</strong> SKU 183 – Bananas (leading in 4 regions)
              </li>
              <li>
                <strong>Client Goal Progress:</strong> Chiriquí +8% above target
              </li>
            </ul>
          </div>

          {/* Risk Card */}
          <div className="bg-white rounded-xl shadow-sm p-5 w-full max-w-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-full bg-red-100">
                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.9 4h2.2l-.3 6H9.2L8.9 4zm1.1 8a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2z"/>
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-red-700">Risks</h4>
            </div>
            <ul className="text-sm text-gray-800 space-y-2">
              <li>
                <strong>Backorders Today:</strong> 28 total – most in Super Xtra
              </li>
              <li>
                <strong>Out-of-Stock Products:</strong> 14 urgent items across key stores
              </li>
              <li>
                <strong>Overdue Clients:</strong> $24,300 unpaid (120+ days)
              </li>
            </ul>
          </div>

          {/* Opportunity Card */}
          <div className="bg-white rounded-xl shadow-sm p-5 w-full max-w-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-full bg-yellow-100">
                <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12h2V9H9v3zm1-8a8 8 0 100 16 8 8 0 000-16z" />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-yellow-700">Opportunities</h4>
            </div>
            <ul className="text-sm text-gray-800 space-y-2">
              <li>
                <strong>Promo ROI:</strong> +26% from Scanner/Tonga campaigns
              </li>
              <li>
                <strong>Inactive Clients:</strong> 17 accounts dormant 30+ days
              </li>
              <li>
                <strong>Rep Underperformance:</strong> 3 reps below quota
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex flex-col h-[calc(100vh-200px)]">
        <main className="flex flex-col items-center justify-center p-10 flex-1">
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
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          )}

          {/* Welcome Text */}
          {messages.length === 0 && !isTyping && (
            <div className="text-center mb-8">
              <p className="text-gray-500 text-sm mb-6">Ask anything. Optimize everything.</p>
            </div>
          )}

          {/* Chat Input */}
          <div className="w-full max-w-3xl">
            <div className="relative flex items-center bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-all duration-200 focus-within:shadow-lg focus-within:border-red-300">
              {/* Input field */}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about La Doña's performance..."
                className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-gray-800 placeholder-gray-400 text-base"
              />

              {/* Action buttons */}
              <div className="flex items-center gap-2 pr-4">
                {/* Attachment button */}
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Paperclip size={20} />
                </button>

                {/* Voice/Search button */}
                <button
                  onClick={inputValue.trim() ? handleSendMessage : toggleVoice}
                  className={`p-2 transition-all duration-200 ${
                    inputValue.trim()
                      ? 'text-white bg-red-500 hover:bg-red-600 rounded-full shadow-lg hover:shadow-xl'
                      : isVoiceActive
                      ? 'text-red-500 bg-red-50 rounded-full'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {inputValue.trim() ? (
                    <Search size={20} />
                  ) : (
                    <Mic size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div ref={messagesEndRef} />
        </main>
      </div>
    </div>
  );
}