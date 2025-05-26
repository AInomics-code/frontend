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
    <div className="min-h-screen w-full bg-[#F9F9F6] grid grid-cols-1 xl:grid-cols-[240px_1fr_320px]">
      {/* Left Sidebar */}
      <aside className="bg-white border-r border-gray-200 p-4 hidden xl:block">
        <h2 className="text-sm font-semibold mb-4">Recent Chats</h2>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 hover:bg-gray-100 rounded px-2 py-1">Sales Forecasting</li>
          <li className="text-sm text-gray-600 hover:bg-gray-100 rounded px-2 py-1">Inventory Alert</li>
        </ul>
      </aside>

      {/* Center Main */}
      <main className="p-6 space-y-6 max-w-4xl mx-auto w-full bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-[#006400]">Hello, world</h1>
        <p className="text-sm text-gray-600">If you see this, the layout is working. You're inside the main column.</p>
      </main>

      {/* Right Panel */}
      <aside className="bg-white border-l border-gray-200 p-4 hidden xl:block">
        <h3 className="text-sm font-semibold mb-3">Contextual Insights</h3>
        <div className="bg-gray-100 text-xs rounded p-3 mb-3">⚠️ El Niño is impacting onion imports.</div>
        <div className="bg-gray-100 text-xs rounded p-3">📊 Q2 ROI +8.2% after vinegar/aderezo push.</div>
      </aside>
    </div>
  );
}
