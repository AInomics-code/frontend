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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const messageContent = inputValue.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Send message to API
      const response = await fetch('/api/conversations/1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: messageContent,
          role: 'user'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Get updated messages including AI response
      const messagesResponse = await fetch('/api/conversations/1/messages');
      if (messagesResponse.ok) {
        const data = await messagesResponse.json();
        setMessages(data.map((msg: any) => ({
          id: msg.id.toString(),
          content: msg.content,
          isUser: msg.role === 'user',
          timestamp: new Date(msg.timestamp),
        })));
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Show error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm experiencing connection issues. Please check your network and try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
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
    <div className="min-h-screen bg-gray-50">
      {/* Top KPI Dashboard - Elegant Layout */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Most Relevant Insights</h3>
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Performance Card */}
          <div 
            onClick={() => toggleCard('performance')}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-md p-3 w-full max-w-xs min-h-[100px] cursor-pointer transition-all duration-300 border border-gray-100 hover:border-gray-200"
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
              <div className="mt-2 text-sm text-gray-700 space-y-1">
                <p><strong>Sales:</strong> 82% of target ($369K/$450K)</p>
                <p><strong>Top SKU:</strong> SKU 183 – Bananas</p>
                <p><strong>Best Region:</strong> Chiriquí +8%</p>
              </div>
            )}
          </div>

          {/* Risk Card */}
          <div 
            onClick={() => toggleCard('risks')}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-md p-3 w-full max-w-xs min-h-[100px] cursor-pointer transition-all duration-300 border border-gray-100 hover:border-gray-200"
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
            className="group bg-white rounded-2xl shadow-sm hover:shadow-md p-3 w-full max-w-xs min-h-[100px] cursor-pointer transition-all duration-300 border border-gray-100 hover:border-gray-200"
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
              <div className="mt-2 text-sm text-gray-700 space-y-1">
                <p><strong>High potential:</strong> <span className="text-green-600">Vinagre Premium +47%</span></p>
                <p><strong>Poor performer:</strong> <span className="text-red-600">Mango Salsa -23%</span></p>
              </div>
            )}
          </div>

        </div>
      </div>
      {/* Main Chat Interface */}
      <div className="flex flex-col h-[calc(100vh-160px)]">
        <main className="flex flex-col items-center justify-center p-8 flex-1">
          {/* Vorta Logo */}
          {messages.length === 0 && !isTyping && (
            <div className="vortex-icon mb-4" style={{ width: '48px', height: '48px', animation: 'vortex-slow-rotate 20s linear infinite' }}>
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
                        <span>La Doña AI</span>
                      </div>
                      <div 
                        className="text-gray-800 leading-relaxed prose prose-gray max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: message.content
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/🔎 \*\*(.*?)\*\*/g, '<div class="mt-4 mb-2 text-blue-700 font-semibold">🔎 $1</div>')
                            .replace(/✅ \*\*(.*?)\*\*/g, '<div class="mt-4 mb-2 text-green-700 font-semibold">✅ $1</div>')
                            .replace(/📊 \*\*(.*?)\*\*/g, '<div class="mt-4 mb-2 text-purple-700 font-semibold">📊 $1</div>')
                            .replace(/⚖️ \*\*(.*?)\*\*/g, '<div class="mt-4 mb-2 text-orange-700 font-semibold">⚖️ $1</div>')
                            .replace(/- 🔸 \*\*(.*?)\*\*/g, '<div class="ml-4 mb-1">• <strong>$1</strong>')
                            .replace(/\n\n/g, '</p><p>')
                            .replace(/\n/g, '<br>')
                        }}
                      />
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
            <div className="text-center mb-12">
              <p className="text-gray-500 text-base mb-8">Ask anything. Optimize everything.</p>
            </div>
          )}

          {/* Chat Input Container */}
          <div className="w-full max-w-4xl px-4">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200/60 p-2">
              <div className="relative flex items-center bg-white rounded-2xl hover:bg-gray-50/50 transition-all duration-200 focus-within:bg-white">
                {/* Input field */}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask anything…"
                  className="flex-1 bg-transparent border-none outline-none px-6 py-5 text-gray-800 placeholder-gray-400 text-lg"
                />

                {/* Action buttons */}
                <div className="flex items-center gap-2 pr-4">
                  {/* Attachment button */}
                  <button 
                    className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-150 pl-[0px] pr-[0px]"
                    title="Attach file"
                  >
                    <Paperclip size={20} strokeWidth={1.5} />
                  </button>

                  {/* Voice button */}
                  <button
                    onClick={toggleVoice}
                    title="Use voice"
                    className="p-3 transition-all duration-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg pl-[9px] pr-[9px]"
                  >
                    <Mic size={20} strokeWidth={1.5} />
                  </button>

                  {/* Send arrow button */}
                  <button
                    onClick={handleSendMessage}
                    title="Send message"
                    className={`p-3 transition-all duration-200 ${
                      inputValue.trim()
                        ? 'text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-sm hover:shadow-md'
                        : 'text-gray-300 bg-gray-100 rounded-lg cursor-not-allowed'
                    }`}
                    disabled={!inputValue.trim()}
                  >
                    <ArrowUp size={20} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div ref={messagesEndRef} />
        </main>
      </div>
    </div>
  );
}