import { useState, useRef, useEffect } from "react";
import {
  Paperclip,
  Globe,
  Mic,
  Search,
  BarChart2,
  ChevronDown,
  ChevronUp,
  ArrowUp,
} from "lucide-react";
import { TypingMessage } from "@/components/typing-message";
import {
  AnimatedCounter,
  PulseIndicator,
  HoverCard,
  ProgressBar,
  FeedbackToast,
} from "@/components/micro-interactions";
import { PromptGenerator } from "@/components/prompt-generator";

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
  const [speechLanguage, setSpeechLanguage] = useState("es-ES");
  const [inputFeedback, setInputFeedback] = useState<
    "success" | "error" | null
  >(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showPromptGenerator, setShowPromptGenerator] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Keyboard shortcuts for voice control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + M to toggle voice
      if ((e.ctrlKey || e.metaKey) && e.key === "m") {
        e.preventDefault();
        toggleVoice();
      }
      // Ctrl/Cmd + L to toggle language
      if ((e.ctrlKey || e.metaKey) && e.key === "l") {
        e.preventDefault();
        toggleLanguage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [speechSupported, isListening, speechLanguage]);

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      setSpeechSupported(true);
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;
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
        let finalTranscript = "";
        let interimText = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimText += transcript;
          }
        }

        if (finalTranscript) {
          setInputValue((prev) => prev + finalTranscript);
          setInterimTranscript("");
        } else {
          setInterimTranscript(interimText);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        setInterimTranscript("");

        // Handle specific errors with user-friendly messages
        if (event.error === "not-allowed") {
          alert(
            "Acceso al micrófono denegado. Por favor permite el acceso al micrófono e intenta de nuevo.",
          );
        } else if (event.error === "no-speech") {
          // Restart listening automatically if no speech detected
          setTimeout(() => {
            if (recognitionRef.current && isListening) {
              try {
                recognitionRef.current.start();
              } catch (e) {
                console.log("Recognition restart failed:", e);
              }
            }
          }, 100);
        } else if (event.error === "network") {
          alert("Error de conexión. Verifica tu conexión a internet.");
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

    // Show success feedback
    setInputFeedback("success");
    setTimeout(() => setInputFeedback(null), 600);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Send message to API
      const response = await fetch("/api/conversations/1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: messageContent,
          role: "user",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Get only the latest AI response instead of all messages
      const messagesResponse = await fetch("/api/conversations/1/messages");
      if (messagesResponse.ok) {
        const data = await messagesResponse.json();
        // Find the latest AI response
        const latestAiMessage = data
          .filter((msg: any) => msg.role === "assistant")
          .pop();
        if (latestAiMessage) {
          const aiMessage: Message = {
            id: latestAiMessage.id.toString(),
            content: latestAiMessage.content,
            isUser: false,
            timestamp: new Date(latestAiMessage.timestamp),
          };
          setMessages((prev) => [...prev, aiMessage]);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);

      // Show error feedback
      setInputFeedback("error");
      setToastMessage("Error de conexión. Verifica tu red e intenta de nuevo.");
      setShowToast(true);
      setTimeout(() => setInputFeedback(null), 600);

      // Show error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm experiencing connection issues. Please check your network and try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
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

  const toggleVoice = async () => {
    if (!speechSupported) {
      alert(
        "Reconocimiento de voz no compatible con este navegador. Prueba con Chrome o Firefox.",
      );
      return;
    }

    if (!recognitionRef.current) {
      alert(
        "Error al inicializar el reconocimiento de voz. Recarga la página e intenta de nuevo.",
      );
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
        speechTimeoutRef.current = null;
      }
    } else {
      try {
        // Request microphone permission first
        await navigator.mediaDevices.getUserMedia({ audio: true });
        // Update language setting before starting
        recognitionRef.current.lang = speechLanguage;
        recognitionRef.current.start();
      } catch (error) {
        console.error("Speech recognition error:", error);
        setIsListening(false);
        alert(
          "No se pudo acceder al micrófono. Verifica los permisos del navegador.",
        );
      }
    }
  };

  const toggleLanguage = () => {
    const newLang = speechLanguage === "es-ES" ? "en-US" : "es-ES";
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

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handlePromptSelect = (prompt: string) => {
    setInputValue(prompt);
    // Automatically send the selected prompt
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Feedback Toast */}
      <FeedbackToast
        type="error"
        message={toastMessage}
        show={showToast}
        onHide={() => setShowToast(false)}
      />
      {/* Top KPI Dashboard - Elegant Layout */}
      <div className="bg-gray-50 px-6 py-1">
        <div className="flex flex-col md:flex-row gap-3 justify-between">
          {/* Performance Card */}
          <div
            onClick={() => toggleCard("performance")}
            className={`group bg-white rounded-lg shadow-sm hover:shadow-md p-2 cursor-pointer transition-all duration-500 border border-gray-100 hover:border-gray-200 flex-1 interactive-hover button-press ripple-effect ${
              expandedCard === "performance"
                ? "min-h-[200px] shadow-lg animate-scaleIn"
                : "min-h-[50px]"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h4 className="text-sm font-medium text-gray-700 group-hover:text-black transition">
                  Puntuación de Rendimiento
                </h4>
              </div>
              {expandedCard === "performance" ? (
                <ChevronUp size={16} className="text-gray-600" />
              ) : (
                <ChevronDown
                  size={14}
                  className="text-gray-400 group-hover:text-gray-600 transition"
                />
              )}
            </div>

            {expandedCard !== "performance" ? (
              <>
                <p className="text-3xl font-semibold text-gray-900">
                  <AnimatedCounter value={88} duration={1500} />
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-gray-500">
                    <AnimatedCounter value={82} duration={1200} suffix="%" /> del
                    objetivo de ventas cumplido
                  </p>
                  <PulseIndicator color="green" size="sm" />
                </div>
                <p className="text-xs text-gray-400 mt-2 italic">
                  Haz clic para ver detalles
                </p>
              </>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className="bg-gray-50 rounded-lg p-3 intelligence-clickable"
                    onClick={() =>
                      setInputValue(
                        "What is our current sales performance and how close are we to target?",
                      )
                    }
                  >
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      Sales Performance
                    </h5>
                    <p className="text-2xl font-bold text-green-600">
                      <AnimatedCounter value={82} duration={1300} suffix="%" />
                    </p>
                    <p className="text-sm text-gray-600">
                      $<AnimatedCounter value={369} duration={1500} />K of $450K
                      target
                    </p>
                    <div className="mt-2">
                      <ProgressBar value={82} max={100} color="green" />
                    </div>
                  </div>
                  <div
                    className="bg-gray-50 rounded-lg p-3 intelligence-clickable"
                    onClick={() =>
                      setInputValue(
                        "Which region, rep, and SKU are driving the strongest results and why?",
                      )
                    }
                  >
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">
                      Top Performers
                    </h5>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Best SKU:</strong> SKU 183 – Bananas
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Best Region:</strong> Chiriquí (+8%)
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Best Rep:</strong> Carlos Mendez
                    </p>
                  </div>
                </div>
                <div
                  className="bg-blue-50 rounded-lg p-3 intelligence-clickable"
                  onClick={() =>
                    setInputValue(
                      "Explain this month's key insights and what actions we should take.",
                    )
                  }
                >
                  <h5 className="text-sm font-semibold text-blue-800 mb-2">
                    Key Insights
                  </h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Revenue up 12% vs last month</li>
                    <li>• 5 new clients acquired this quarter</li>
                    <li>• Premium products showing 15% growth</li>
                    <li>• Export sales exceeding expectations by 18%</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Risk Card */}
          <div
            onClick={() => toggleCard("risks")}
            className={`group bg-white rounded-lg shadow-sm hover:shadow-md p-2 cursor-pointer transition-all duration-500 border border-gray-100 hover:border-gray-200 flex-1 interactive-hover button-press ripple-effect ${
              expandedCard === "risks"
                ? "min-h-[200px] shadow-lg animate-scaleIn"
                : "min-h-[50px]"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <h4 className="text-sm font-medium text-gray-700 group-hover:text-black transition">
                  Zonas en Riesgo
                </h4>
              </div>
              {expandedCard === "risks" ? (
                <ChevronUp size={16} className="text-gray-600" />
              ) : (
                <ChevronDown
                  size={14}
                  className="text-gray-400 group-hover:text-gray-600 transition"
                />
              )}
            </div>

            {expandedCard !== "risks" ? (
              <>
                <p className="text-2xl font-semibold text-gray-900">3 Zonas</p>
                <p className="text-xs text-gray-500">
                  Chiriquí, Colón, San Miguelito
                </p>
                <p className="text-xs text-gray-400 mt-2 italic">
                  Click to view details
                </p>
              </>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className="bg-red-50 rounded-lg p-3 intelligence-clickable"
                    onClick={() =>
                      setInputValue(
                        "What are our critical issues and backorders? How can we resolve them?",
                      )
                    }
                  >
                    <h5 className="text-sm font-semibold text-red-800 mb-2">
                      Critical Issues
                    </h5>
                    <p className="text-xl font-bold text-red-600">28</p>
                    <p className="text-sm text-red-700">Total backorders</p>
                  </div>
                  <div
                    className="bg-orange-50 rounded-lg p-3 intelligence-clickable"
                    onClick={() =>
                      setInputValue(
                        "Which products are out of stock and what's the urgency level?",
                      )
                    }
                  >
                    <h5 className="text-sm font-semibold text-orange-800 mb-2">
                      Out of Stock
                    </h5>
                    <p className="text-xl font-bold text-orange-600">14</p>
                    <p className="text-sm text-orange-700">Urgent items</p>
                  </div>
                  <div
                    className="bg-yellow-50 rounded-lg p-3 intelligence-clickable"
                    onClick={() =>
                      setInputValue(
                        "Show me details about overdue payments and recovery strategies.",
                      )
                    }
                  >
                    <h5 className="text-sm font-semibold text-yellow-800 mb-2">
                      Overdue
                    </h5>
                    <p className="text-lg font-bold text-yellow-700">$24.3K</p>
                    <p className="text-sm text-yellow-700">120+ days</p>
                  </div>
                </div>
                <div
                  className="bg-gray-50 rounded-lg p-3 intelligence-clickable"
                  onClick={() =>
                    setInputValue(
                      "Analyze risk zones Chiriquí, Colón, and San Miguelito. What actions should we take?",
                    )
                  }
                >
                  <h5 className="text-sm font-semibold text-gray-800 mb-2">
                    Risk Zones Details
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Chiriquí</span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                        High Risk
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Colón</span>
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                        Medium Risk
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">San Miguelito</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        Low Risk
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Opportunity Card */}
          <div
            onClick={() => toggleCard("opportunities")}
            className={`group bg-white rounded-lg shadow-sm hover:shadow-md p-2 cursor-pointer transition-all duration-500 border border-gray-100 hover:border-gray-200 flex-1 ${
              expandedCard === "opportunities"
                ? "min-h-[200px] shadow-lg"
                : "min-h-[50px]"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <h4 className="text-sm font-medium text-gray-700 group-hover:text-black transition">
                  Product Opportunity
                </h4>
              </div>
              {expandedCard === "opportunities" ? (
                <ChevronUp size={16} className="text-gray-600" />
              ) : (
                <ChevronDown
                  size={14}
                  className="text-gray-400 group-hover:text-gray-600 transition"
                />
              )}
            </div>

            {expandedCard !== "opportunities" ? (
              <>
                <p className="text-lg font-semibold text-gray-900">
                  Vinagre Premium
                </p>
                <p className="text-xs text-gray-500">
                  High potential • Poor: Mango Salsa
                </p>
                <p className="text-xs text-gray-400 mt-2 italic">
                  Click to view details
                </p>
              </>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className="bg-green-50 rounded-lg p-3 intelligence-clickable"
                    onClick={() =>
                      setInputValue(
                        "Tell me about Vinagre Premium opportunity and how to maximize the $45K potential revenue.",
                      )
                    }
                  >
                    <h5 className="text-sm font-semibold text-green-800 mb-2">
                      High Opportunity
                    </h5>
                    <p className="text-lg font-bold text-green-600">
                      Vinagre Premium
                    </p>
                    <p className="text-sm text-green-700 mb-2">
                      +$45K potential revenue
                    </p>
                    <div className="text-xs text-green-600">
                      <p>• Increase distribution to 15 new stores</p>
                      <p>• Focus on premium market segment</p>
                    </div>
                  </div>
                  <div
                    className="bg-red-50 rounded-lg p-3 intelligence-clickable"
                    onClick={() =>
                      setInputValue(
                        "Analyze Mango Salsa underperformance and suggest solutions or discontinuation strategy.",
                      )
                    }
                  >
                    <h5 className="text-sm font-semibold text-red-800 mb-2">
                      Underperforming
                    </h5>
                    <p className="text-lg font-bold text-red-600">
                      Mango Salsa
                    </p>
                    <p className="text-sm text-red-700 mb-2">
                      -$12K revenue impact
                    </p>
                    <div className="text-xs text-red-600">
                      <p>• Consider discontinuation</p>
                      <p>• Low demand across all regions</p>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-blue-50 rounded-lg p-3 intelligence-clickable"
                  onClick={() =>
                    setInputValue(
                      "Detail the strategic actions for Vinagre Premium launch and Aceite de Coco promotion timeline.",
                    )
                  }
                >
                  <h5 className="text-sm font-semibold text-blue-800 mb-2">
                    Strategic Actions
                  </h5>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div
                      className="flex items-center gap-2 animate-slideInLeft"
                      style={{ animationDelay: "0ms" }}
                    >
                      <PulseIndicator color="blue" size="sm" />
                      <span>
                        Launch Vinagre Premium in Panamá Centro (+8 stores)
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-2 animate-slideInLeft"
                      style={{ animationDelay: "150ms" }}
                    >
                      <PulseIndicator color="green" size="sm" />
                      <span>Promotional campaign for Aceite de Coco</span>
                    </div>
                    <div
                      className="flex items-center gap-2 animate-slideInLeft"
                      style={{ animationDelay: "300ms" }}
                    >
                      <PulseIndicator color="yellow" size="sm" />
                      <span>Review Mango Salsa pricing strategy</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Main Chat Interface */}
      <div className="flex flex-col h-[calc(100vh-120px)]">
        <main className="flex flex-col items-center justify-center p-8 flex-1 relative">
          {/* Vorta Logo */}
          {messages.length === 0 && !isTyping && (
            <div
              className="vortex-icon mb-12"
              style={
                {
                  width: "60px",
                  height: "60px",
                  "--vortex-size": "60px",
                  animation: "vortex-slow-rotate 20s linear infinite",
                } as React.CSSProperties
              }
            >
              <div className="vortex-blade"></div>
              <div className="vortex-blade"></div>
              <div className="vortex-blade"></div>
              <div className="vortex-blade"></div>
              <div className="vortex-blade"></div>
            </div>
          )}

          {/* Messages Area */}
          {messages.length > 0 && (
            <div className="flex-1 w-full max-w-4xl overflow-y-auto mb-8 px-8">
              <div className="space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {message.isUser ? (
                      <div className="flex justify-end">
                        <div className="user-bubble bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-2xl rounded-bl-md max-w-[70%] animate-slideInRight text-sm font-normal leading-relaxed shadow-sm interactive-hover">
                          {message.content}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div
                            className="vortex-icon active"
                            style={
                              {
                                width: "14px",
                                height: "14px",
                                "--vortex-size": "14px",
                              } as React.CSSProperties
                            }
                          >
                            <div className="vortex-blade"></div>
                            <div className="vortex-blade"></div>
                            <div className="vortex-blade"></div>
                            <div className="vortex-blade"></div>
                            <div className="vortex-blade"></div>
                          </div>
                          <span>La Doña AI</span>
                        </div>
                        <TypingMessage
                          content={message.content}
                          isLatestMessage={
                            messages.indexOf(message) === messages.length - 1 &&
                            !message.isUser
                          }
                          messageId={message.id}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Typing Indicator */}
          {isTyping && (
            <div className="mb-8 animate-bounceIn">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 animate-slideInLeft">
                <div
                  className="vortex-icon active animate-glow"
                  style={
                    {
                      width: "14px",
                      height: "14px",
                      "--vortex-size": "14px",
                    } as React.CSSProperties
                  }
                >
                  <div className="vortex-blade"></div>
                  <div className="vortex-blade"></div>
                  <div className="vortex-blade"></div>
                  <div className="vortex-blade"></div>
                  <div className="vortex-blade"></div>
                </div>
                <span className="shimmer-loading">
                  La Doña AI está analizando...
                </span>
              </div>
              <div className="typing-indicator animate-fadeInUp">
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></span>
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></span>
              </div>
            </div>
          )}

          {/* Chat Input Container */}
          <div className="w-full max-w-4xl px-8 bg-gray-50 pb-8 pt-4">
            <div
              className={`relative flex items-center bg-white rounded-3xl border transition-all duration-200 focus-within:bg-white p-2 interactive-hover ${
                inputFeedback === "success"
                  ? "feedback-success border-green-300"
                  : inputFeedback === "error"
                    ? "feedback-error border-red-300"
                    : isListening
                      ? "border-red-300 bg-red-50/30 shadow-lg shadow-red-100/50 animate-glow"
                      : "border-gray-200/60 hover:bg-gray-50/50"
              }`}
            >
              {/* Input field with speech overlay */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    isListening ? "Escuchando..." : "Pregunta lo que quieras…"
                  }
                  className="w-full bg-transparent border-none outline-none px-6 py-5 text-gray-800 placeholder-gray-400 text-lg resize-none"
                  disabled={isTyping}
                />

                {/* Interim speech results overlay */}
                {isListening && interimTranscript && (
                  <div className="absolute inset-0 px-6 py-5 text-lg text-gray-400 italic pointer-events-none">
                    {inputValue}
                    {interimTranscript}
                  </div>
                )}

                {/* Voice recording indicator */}
                {isListening && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <div className="flex gap-1">
                      <div
                        className="w-1 h-3 bg-red-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-1 h-4 bg-red-500 rounded-full animate-pulse"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-1 h-2 bg-red-400 rounded-full animate-pulse"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                    <span className="text-xs text-red-500 font-medium">
                      REC
                    </span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pr-4">
                {/* Language toggle for speech recognition */}
                {speechSupported && (
                  <button
                    onClick={toggleLanguage}
                    title={`Cambiar idioma a ${speechLanguage === "es-ES" ? "Inglés" : "Español"} (Ctrl+L)`}
                    className="px-2 py-1 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-150 button-press ripple-effect"
                  >
                    {speechLanguage === "es-ES" ? "ES" : "EN"}
                  </button>
                )}

                {/* Attachment button */}
                <button
                  className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-150 pl-[0px] pr-[0px] button-press ripple-effect interactive-hover"
                  title="Attach file"
                >
                  <Paperclip size={20} strokeWidth={1.5} />
                </button>

                {/* Voice button */}
                <button
                  onClick={toggleVoice}
                  title={
                    !speechSupported
                      ? "Reconocimiento de voz no disponible"
                      : isListening
                        ? "Hacer clic para detener grabación (Ctrl+M)"
                        : "Hacer clic y hablar (Ctrl+M)"
                  }
                  disabled={!speechSupported}
                  className={`relative p-3 transition-all duration-200 rounded-lg pl-[9px] pr-[9px] button-press ripple-effect ${
                    !speechSupported
                      ? "text-gray-300 bg-gray-50 cursor-not-allowed"
                      : isListening
                        ? "text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200/50 scale-105 animate-glow"
                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-50 interactive-hover"
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
                  className={`p-3 transition-all duration-200 button-press ripple-effect ${
                    inputValue.trim() && !isTyping
                      ? "text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-sm hover:shadow-md interactive-hover animate-pulse-success"
                      : "text-gray-300 bg-gray-100 rounded-lg cursor-not-allowed"
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

      {/* AI Prompt Generator */}
      <PromptGenerator
        onPromptSelect={handlePromptSelect}
        isVisible={showPromptGenerator}
        onToggle={() => setShowPromptGenerator(!showPromptGenerator)}
      />
    </div>
  );
}
