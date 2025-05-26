import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { Menu } from "lucide-react";

export function ChatInterface() {
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectConversation = (id: number | null) => {
    setSelectedConversationId(id);
    // Close sidebar on mobile when selecting a conversation
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleSendMessage = () => {
    // Auto-scroll to bottom when a new message is sent
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen w-full bg-[#F9F9F6]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm">La</span>
            </div>
            <div className="text-red-600 font-semibold">
              <span className="text-black">La</span> Doña Business Intelligence
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">GM</span>
              </div>
              <span className="text-gray-700 text-sm">General Manager</span>
            </div>
            <button className="text-gray-500 text-sm flex items-center gap-1">
              <span>Logout</span>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 space-y-8">
        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Daily Sales Target */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                <span className="text-gray-600 text-sm font-medium">Daily Sales Target</span>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="mb-2">
              <span className="text-3xl font-bold text-green-600">41%</span>
              <span className="text-red-500 text-sm ml-2">Target: 46%</span>
            </div>
            <p className="text-gray-500 text-sm">5% below expected daily pace</p>
          </div>

          {/* Zones at Risk */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm font-medium">Zones at Risk</span>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="mb-2">
              <span className="text-3xl font-bold text-red-600">3</span>
              <span className="text-gray-500 text-sm ml-2">7 Reps</span>
            </div>
            <p className="text-gray-500 text-sm">Colón, Chiriquí, and Oeste below target</p>
          </div>

          {/* El Extra Campaign */}
          <div className="bg-yellow-50 rounded-xl p-6 shadow-sm border-l-4 border-yellow-500">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-gray-600 text-sm font-medium">El Extra Campaign</span>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="mb-2">
              <span className="text-3xl font-bold text-yellow-700">8.2%</span>
              <span className="text-gray-600 text-sm ml-2">ROI</span>
            </div>
            <p className="text-gray-600 text-sm">$6,200 invested, recommend vinegar + aderezo combo</p>
          </div>
        </div>

        {/* Doña Assistant Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Doña Assistant</h2>
            <div className="ml-auto">
              <span className="text-sm text-gray-400">AI/AI</span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🤖</span>
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg px-4 py-3 inline-block max-w-md">
                <p className="text-gray-700 text-sm">How can I help you today?</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
