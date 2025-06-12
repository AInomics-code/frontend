import { useState, useRef, useEffect } from "react";
import { Paperclip, Globe, Mic, Search, BarChart2, ChevronDown, ChevronUp, ArrowUp } from "lucide-react";
import { TypingMessage } from "@/components/typing-message";

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
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [speechLanguage, setSpeechLanguage] = useState('es-ES');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Push-to-talk voice functions
  const startRecording = async () => {
    if (!speechSupported) {
      alert('Reconocimiento de voz no compatible con este navegador. Prueba con Chrome o Firefox.');
      return;
    }

    if (!recognitionRef.current) {
      alert('Error al inicializar el reconocimiento de voz. Recarga la página e intenta de nuevo.');
      return;
    }

    if (isListening) return; // Already recording

    try {
      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true });
      // Update language setting before starting
      recognitionRef.current.lang = speechLanguage;
      recognitionRef.current.start();
    } catch (error) {
      console.error('Speech recognition error:', error);
      setIsListening(false);
      alert('No se pudo acceder al micrófono. Verifica los permisos del navegador.');
    }
  };

  const stopRecording = () => {
    if (!isListening || !recognitionRef.current) return;

    recognitionRef.current.stop();
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
      speechTimeoutRef.current = null;
    }
  };

  const toggleLanguage = () => {
    const newLang = speechLanguage === 'es-ES' ? 'en-US' : 'es-ES';
    setSpeechLanguage(newLang);
    
    // If currently listening, restart with new language
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setTimeout(() => {
        if (recognitionRef.current) {
          recognitionRef.current.lang = newLang;
          recognitionRef.current.start();
        }
      }, 100);
    }
  };

  // Keyboard shortcuts for voice control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + M to start recording (hold)
      if ((e.ctrlKey || e.metaKey) && e.key === 'm' && !e.repeat) {
        e.preventDefault();
        startRecording();
      }
      // Ctrl/Cmd + L to toggle language
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        toggleLanguage();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Release Ctrl/Cmd + M to stop recording
      if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault();
        stopRecording();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [speechSupported, isListening, speechLanguage]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setSpeechSupported(true);
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = speechLanguage;
      recognitionRef.current.maxAlternatives = 1;
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setInterimTranscript("");
        
        // Set a timeout to automatically stop listening after 30 seconds
        speechTimeoutRef.current = setTimeout(() => {
          if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
          }
        }, 30000);
      };
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimText = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimText += transcript;
          }
        }
        
        if (finalTranscript) {
          setInputValue(prev => prev + finalTranscript);
          setInterimTranscript("");
        } else {
          setInterimTranscript(interimText);
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setInterimTranscript("");
        
        // Clear timeout
        if (speechTimeoutRef.current) {
          clearTimeout(speechTimeoutRef.current);
          speechTimeoutRef.current = null;
        }
        
        if (event.error === 'no-speech') {
          // Automatically restart if no speech detected
          setTimeout(() => {
            if (recognitionRef.current && isListening) {
              try {
                recognitionRef.current.start();
              } catch (e) {
                console.log('Recognition restart failed:', e);
              }
            }
          }, 100);
        } else if (event.error === 'network') {
          alert('Error de conexión. Verifica tu conexión a internet.');
        }
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        setInterimTranscript("");
        
        // Clear timeout
        if (speechTimeoutRef.current) {
          clearTimeout(speechTimeoutRef.current);
          speechTimeoutRef.current = null;
        }
      };
    } else {
      setSpeechSupported(false);
    }
  }, []);

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

      // Get only the latest AI response instead of all messages
      const messagesResponse = await fetch('/api/conversations/1/messages');
      if (messagesResponse.ok) {
        const data = await messagesResponse.json();
        // Find the latest AI response
        const latestAiMessage = data.filter((msg: any) => msg.role === 'assistant').pop();
        if (latestAiMessage) {
          const aiMessage: Message = {
            id: latestAiMessage.id.toString(),
            content: latestAiMessage.content,
            isUser: false,
            timestamp: new Date(latestAiMessage.timestamp),
          };
          setMessages(prev => [...prev, aiMessage]);
        }
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

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top KPI Dashboard - Elegant Layout */}
      <div className="bg-gray-50 px-6 py-1">
        <div className="flex flex-col md:flex-row gap-3 justify-between">
          
          {/* Performance Card */}
          <div 
            onClick={() => toggleCard('performance')}
            className={`cursor-pointer flex-1 border bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 ${
              expandedCard === 'performance' ? 'ring-2 ring-red-100 shadow-lg' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <BarChart2 size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Performance</h3>
                  <p className="text-xl font-bold text-green-600">94.2%</p>
                </div>
              </div>
              {expandedCard === 'performance' ? 
                <ChevronUp size={16} className="text-gray-400" /> : 
                <ChevronDown size={16} className="text-gray-400" />
              }
            </div>
            {expandedCard === 'performance' && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Meta Mensual:</span>
                    <div className="font-semibold text-gray-900">$2.1M</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Actual:</span>
                    <div className="font-semibold text-green-600">$1.98M</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Días Restantes:</span>
                    <div className="font-semibold text-gray-900">12</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Proyección:</span>
                    <div className="font-semibold text-green-600">$2.15M</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sales Card */}
          <div 
            onClick={() => toggleCard('sales')}
            className={`cursor-pointer flex-1 border bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 ${
              expandedCard === 'sales' ? 'ring-2 ring-blue-100 shadow-lg' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Globe size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Ventas Hoy</h3>
                  <p className="text-xl font-bold text-blue-600">$87,240</p>
                </div>
              </div>
              {expandedCard === 'sales' ? 
                <ChevronUp size={16} className="text-gray-400" /> : 
                <ChevronDown size={16} className="text-gray-400" />
              }
            </div>
            {expandedCard === 'sales' && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Nacional:</span>
                    <div className="font-semibold text-gray-900">$62,180</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Export:</span>
                    <div className="font-semibold text-blue-600">$25,060</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Órdenes:</span>
                    <div className="font-semibold text-gray-900">143</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Clientes:</span>
                    <div className="font-semibold text-blue-600">89</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Inventory Card */}
          <div 
            onClick={() => toggleCard('inventory')}
            className={`cursor-pointer flex-1 border bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 ${
              expandedCard === 'inventory' ? 'ring-2 ring-orange-100 shadow-lg' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Search size={20} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Stock Alerts</h3>
                  <p className="text-xl font-bold text-orange-600">12</p>
                </div>
              </div>
              {expandedCard === 'inventory' ? 
                <ChevronUp size={16} className="text-gray-400" /> : 
                <ChevronDown size={16} className="text-gray-400" />
              }
            </div>
            {expandedCard === 'inventory' && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Stock Bajo:</span>
                    <span className="font-semibold text-orange-600">8 SKUs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Agotado:</span>
                    <span className="font-semibold text-red-600">4 SKUs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Restock Urgente:</span>
                    <span className="font-semibold text-gray-900">Condimento 500g</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex h-[calc(100vh-140px)]">
        {/* Chat Section */}
        <main className="flex-1 flex flex-col bg-white">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic size={24} className="text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  La Doña AI Business Intelligence
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Your intelligent business assistant. Ask about sales, inventory, clients, or any business data.
                </p>
                <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    "¿Cómo van las ventas hoy?"
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    "Show me backorders"
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    "Análisis de inventario"
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    "Client performance report"
                  </span>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.isUser
                        ? "bg-red-500 text-white"
                        : "bg-gray-50 text-gray-900 border border-gray-200"
                    }`}
                  >
                    <div 
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                    <div
                      className={`text-xs mt-2 ${
                        message.isUser ? "text-red-100" : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            )}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-50 text-gray-900 border border-gray-200 p-4 rounded-2xl max-w-[80%]">
                  <TypingMessage />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-gray-100">
            <div className={`flex items-center gap-3 bg-white border-2 rounded-2xl transition-all duration-200 min-h-[60px] ${
              isListening 
                ? 'border-red-300 bg-red-50/30 shadow-lg shadow-red-100/50' 
                : 'border-gray-200/60 hover:bg-gray-50/50'
            }`}>
              {/* Input field with speech overlay */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isListening ? "Escuchando..." : "Pregunta lo que quieras…"}
                  className="w-full bg-transparent border-none outline-none px-6 py-5 text-gray-800 placeholder-gray-400 text-lg resize-none"
                  disabled={isTyping}
                />
                
                {/* Interim speech results overlay */}
                {isListening && interimTranscript && (
                  <div className="absolute inset-0 px-6 py-5 text-lg text-gray-400 italic pointer-events-none">
                    {inputValue}{interimTranscript}
                  </div>
                )}
                
                {/* Voice recording indicator */}
                {isListening && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-1 h-3 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0ms'}}></div>
                      <div className="w-1 h-4 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '150ms'}}></div>
                      <div className="w-1 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '300ms'}}></div>
                    </div>
                    <span className="text-xs text-red-500 font-medium">REC</span>
                  </div>
                )}
              </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 pr-4">
                  {/* Language toggle for speech recognition */}
                  {speechSupported && (
                    <button
                      onClick={toggleLanguage}
                      title={`Cambiar idioma a ${speechLanguage === 'es-ES' ? 'Inglés' : 'Español'} (Ctrl+L)`}
                      className="px-2 py-1 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-150"
                    >
                      {speechLanguage === 'es-ES' ? 'ES' : 'EN'}
                    </button>
                  )}

                  {/* Attachment button */}
                  <button 
                    className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-150 pl-[0px] pr-[0px]"
                    title="Attach file"
                  >
                    <Paperclip size={20} strokeWidth={1.5} />
                  </button>

                  {/* Voice button with push-to-talk */}
                  <button
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onMouseLeave={stopRecording}
                    title={
                      !speechSupported 
                        ? "Reconocimiento de voz no disponible" 
                        : "Mantén presionado para grabar (como ChatGPT desktop)"
                    }
                    disabled={!speechSupported}
                    className={`relative p-3 transition-all duration-200 rounded-lg pl-[9px] pr-[9px] select-none ${
                      !speechSupported
                        ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                        : isListening 
                          ? 'text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200/50 scale-105' 
                          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Mic size={20} strokeWidth={1.5} />
                    {isListening && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
                    )}
                  </button>

                  {/* Send arrow button */}
                  <button
                    onClick={handleSendMessage}
                    title="Send message"
                    className={`p-3 transition-all duration-200 ${
                      inputValue.trim() && !isTyping
                        ? 'text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-sm hover:shadow-md'
                        : 'text-gray-300 bg-gray-100 rounded-lg cursor-not-allowed'
                    }`}
                    disabled={!inputValue.trim() || isTyping}
                  >
                    <ArrowUp size={20} strokeWidth={1.5} />
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