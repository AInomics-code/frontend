import { useState, useRef, useEffect } from "react";
import { Paperclip, Globe, Mic, Search, BarChart2, ChevronDown, ChevronUp } from "lucide-react";

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
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
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

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top KPI Dashboard - Elegant Layout */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-6">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Most Relevant Insights</h3>
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Performance Card */}
          <div 
            onClick={() => toggleCard('performance')}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-md p-4 w-full max-w-xs min-h-[130px] cursor-pointer transition-all duration-300 border border-gray-100 hover:border-gray-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">✅</span>
              <h4 className="text-sm font-medium text-gray-700 group-hover:text-black transition">Performance Score</h4>
            </div>
            
            {expandedCard !== 'performance' ? (
              <>
                <p className="text-3xl font-semibold text-gray-900">88</p>
                <p className="text-xs text-gray-500 mt-1">82% of sales target met</p>
              </>
            ) : (
              <div className="mt-2 text-sm text-gray-700 space-y-1">
                <p><strong>Sales vs Target:</strong> 82%</p>
                <p><strong>Top SKU:</strong> SKU 183 – Bananas</p>
                <p><strong>Client Progress:</strong> Chiriquí +8%</p>
              </div>
            )}
          </div>

          {/* Risk Card */}
          <div 
            onClick={() => toggleCard('risks')}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-md p-4 w-full max-w-xs min-h-[130px] cursor-pointer transition-all duration-300 border border-gray-100 hover:border-gray-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">⚠️</span>
              <h4 className="text-sm font-medium text-gray-700 group-hover:text-black transition">Zones at Risk</h4>
            </div>
            
            {expandedCard !== 'risks' ? (
              <>
                <p className="text-2xl font-semibold text-gray-900">3 Zones</p>
                <p className="text-xs text-gray-500">Chiriquí, Colón, San Miguelito</p>
              </>
            ) : (
              <div className="mt-2 text-sm text-gray-700 space-y-1">
                <p><strong>Backorders:</strong> 28 total</p>
                <p><strong>Out-of-Stock:</strong> 14 urgent items</p>
                <p><strong>Overdue:</strong> $24,300 (120+ days)</p>
              </div>
            )}
          </div>

          {/* Opportunity Card */}
          <div 
            onClick={() => toggleCard('opportunities')}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-md p-4 w-full max-w-xs min-h-[130px] cursor-pointer transition-all duration-300 border border-gray-100 hover:border-gray-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💡</span>
              <h4 className="text-sm font-medium text-gray-700 group-hover:text-black transition">Product Opportunity</h4>
            </div>
            
            {expandedCard !== 'opportunities' ? (
              <>
                <p className="text-lg font-semibold text-gray-900">Aderezo Premium</p>
                <p className="text-xs text-gray-500">+18% lift • Low: Mango Salsa</p>
              </>
            ) : (
              <div className="mt-2 text-sm text-gray-700 space-y-1">
                <p><strong>High ROI:</strong> +26% lift</p>
                <p><strong>Inactive Clients:</strong> 17 accounts</p>
                <p><strong>Rep Performance:</strong> 3 under quota</p>
              </div>
            )}
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