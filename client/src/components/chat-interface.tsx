import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { Menu, TrendingUp, AlertTriangle, Star, Mic, Send, BarChart3, User, Phone, Package, MapPin, ArrowRight, Search, Globe, Target, TrendingDown, Check, ArrowDown, Paperclip, MoreHorizontal, Copy, FileText, RotateCcw, Plus, BarChart, Brain, Info } from "lucide-react";
import vortexLogo from "@assets/Screenshot 2025-05-26 alle 13.53.01.png";
import laDonaLogo from "@assets/Screenshot 2025-05-19 alle 15.08.46.png";

export function ChatInterface() {
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [typingText, setTypingText] = useState("");
  const [showActions, setShowActions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [isLoading]);

  const typewriterEffect = (text: string, callback: () => void) => {
    let index = 0;
    setTypingText("");
    const timer = setInterval(() => {
      if (index < text.length) {
        setTypingText(prev => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
        callback();
      }
    }, 30);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    setIsProcessing(true);
    setShowResponse(true);
    setShowActions(false);
    
    // Simulate processing delay
    setTimeout(() => {
      const response = "Based on your La Doña regional performance data, I can see that Colón region is currently at 67% of target with some challenges in vinegar sales and delivery timelines. Would you like me to analyze the specific factors contributing to this performance gap?";
      
      typewriterEffect(response, () => {
        setCurrentResponse(response);
        setIsProcessing(false);
        setTimeout(() => setShowActions(true), 500);
      });
    }, 2000);
    
    setInputValue("");
  };

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  const handleFileAttach = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeAttachedFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSelectConversation = (id: number | null) => {
    setSelectedConversationId(id);
    // Close sidebar on mobile when selecting a conversation
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };



  return (
    <div className="min-h-screen w-full bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={laDonaLogo} 
              alt="La Doña Logo" 
              className="h-8 w-auto"
            />
            <h1 className="text-gray-700 font-semibold text-lg">
              La Doña Business Intelligence
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-800 text-sm font-medium">Carlos Mendoza</span>
                <span className="text-gray-500 text-xs">General Manager</span>
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200">
              <span>Logout</span>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Centered Layout */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6">

        {/* Vorta Logo */}
        <div className="mb-6">
          <div className="vortex-icon animate-pulse mx-auto" style={{ width: '32px', height: '32px' }}>
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
            <div className="vortex-blade"></div>
          </div>
        </div>

        {/* Chat Input Area */}
        <div className="flex items-center w-full max-w-2xl rounded-2xl border border-gray-200 shadow-sm px-4 py-2">
          <input
            type="text"
            placeholder="Ask about KPIs or performance..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none placeholder-gray-400 text-gray-800 text-base"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isProcessing}
            className="ml-3 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Ask'}
          </button>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="mt-4 flex items-center gap-2">
            <div className="vortex-icon active scale-75">
              <div className="vortex-blade"></div>
              <div className="vortex-blade"></div>
              <div className="vortex-blade"></div>
              <div className="vortex-blade"></div>
              <div className="vortex-blade"></div>
              <div className="vortex-blade"></div>
            </div>
            <p className="text-sm text-gray-400 italic animate-pulse">Preparing insights…</p>
          </div>
        )}

      </main>
    </div>


  );
}
