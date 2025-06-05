import { useState, useRef, useEffect } from "react";
import { Paperclip, Globe, Mic, Search, BarChart2, ChevronDown, ChevronUp, ArrowUp } from "lucide-react";

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
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h4 className="text-sm font-medium text-gray-700 group-hover:text-black transition">Performance Score</h4>
              </div>
              <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition" />
            </div>
            
            {expandedCard !== 'performance' ? (
              <>
                <p className="text-3xl font-semibold text-gray-900">88</p>
                <p className="text-xs text-gray-500 mt-1">82% of sales target met</p>
                <p className="text-xs text-gray-400 mt-2 italic">Click to view details</p>
              </>
            ) : (
              <div className="mt-2 text-sm text-gray-700 space-y-2">
                <div className="bg-gray-50 p-2 rounded-lg">
                  <p><strong>Sales vs Target:</strong> 82% (Goal: $450K, Current: $369K)</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <p><strong>Top SKU:</strong> SKU 183 – Bananas</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <p><strong>Best Region:</strong> Chiriquí +8% above target</p>
                </div>
              </div>
            )}
          </div>

          {/* Risk Card */}
          <div 
            onClick={() => toggleCard('risks')}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-md p-4 w-full max-w-xs min-h-[130px] cursor-pointer transition-all duration-300 border border-gray-100 hover:border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <h4 className="text-sm font-medium text-gray-700 group-hover:text-black transition">Zones at Risk</h4>
              </div>
              <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition" />
            </div>
            
            {expandedCard !== 'risks' ? (
              <>
                <p className="text-2xl font-semibold text-gray-900">3 Zones</p>
                <p className="text-xs text-gray-500">Chiriquí, Colón, San Miguelito</p>
                <p className="text-xs text-gray-400 mt-2 italic">Click to view details</p>
              </>
            ) : (
              <div className="mt-2 text-sm text-gray-700 space-y-2">
                <div className="bg-red-50 p-2 rounded-lg border-l-2 border-red-200">
                  <p><strong>Backorders:</strong> 28 total (Super Xtra: 12, El Rey: 8)</p>
                </div>
                <div className="bg-orange-50 p-2 rounded-lg border-l-2 border-orange-200">
                  <p><strong>Out-of-Stock:</strong> 14 urgent items</p>
                </div>
                <div className="bg-yellow-50 p-2 rounded-lg border-l-2 border-yellow-200">
                  <p><strong>Overdue:</strong> $24,300 unpaid (120+ days)</p>
                </div>
              </div>
            )}
          </div>

          {/* Opportunity Card */}
          <div 
            onClick={() => toggleCard('opportunities')}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-md p-4 w-full max-w-xs min-h-[130px] cursor-pointer transition-all duration-300 border border-gray-100 hover:border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <h4 className="text-sm font-medium text-gray-700 group-hover:text-black transition">Product Opportunity</h4>
              </div>
              <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition" />
            </div>
            
            {expandedCard !== 'opportunities' ? (
              <>
                <p className="text-lg font-semibold text-gray-900">Vinagre Premium</p>
                <p className="text-xs text-gray-500">High potential • Poor: Mango Salsa</p>
                <p className="text-xs text-gray-400 mt-2 italic">Click to view details</p>
              </>
            ) : (
              <div className="mt-4 space-y-5 text-sm">
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">Vinagre Premium</p>
                  <p className="text-gray-600 leading-relaxed"><span className="font-medium text-green-600">+47% demand growth</span> in past 3 months across Chiriquí, David, and Santiago</p>
                  <p className="text-xs text-green-700 font-medium">Suggested: Increase stock</p>
                </div>
                <div className="h-px bg-gray-100 my-4"></div>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">Mango Salsa Verde</p>
                  <p className="text-gray-600 leading-relaxed"><span className="font-medium text-red-600">-23% sales decline</span> with <span className="font-medium text-red-600">18% return rate</span>, high production costs</p>
                  <p className="text-xs text-red-700 font-medium">Suggested: Cut back or rework</p>
                </div>
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
            <div className="vortex-icon mb-4" style={{ width: '32px', height: '32px', animation: 'vortex-slow-rotate 20s linear infinite' }}>
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
            <div className="relative flex items-center bg-white border border-gray-200 rounded-2xl shadow-sm hover:border-gray-300 transition-all duration-200 focus-within:shadow-md focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-200">
              {/* Input field */}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything…"
                className="flex-1 bg-transparent border-none outline-none px-5 py-3.5 text-gray-800 placeholder-gray-400 text-base"
              />

              {/* Action buttons */}
              <div className="flex items-center gap-1 pr-3">
                {/* Attachment button */}
                <button 
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-150"
                  title="Attach file"
                >
                  <Paperclip size={18} strokeWidth={1.5} />
                </button>

                {/* Voice/Search button */}
                <button
                  onClick={inputValue.trim() ? handleSendMessage : toggleVoice}
                  title={inputValue.trim() ? "Send message" : "Use voice"}
                  className={`p-2 transition-all duration-200 ${
                    inputValue.trim()
                      ? 'text-white bg-gray-800 hover:bg-gray-900 rounded-lg shadow-sm hover:shadow-md'
                      : isVoiceActive
                      ? 'text-red-500 bg-red-50 rounded-lg'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg'
                  }`}
                >
                  {inputValue.trim() ? (
                    <ArrowUp size={18} strokeWidth={1.5} />
                  ) : (
                    <Mic size={18} strokeWidth={1.5} />
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