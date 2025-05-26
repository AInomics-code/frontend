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
    <div className="min-h-screen w-full grid grid-cols-[240px_1fr_320px]">
      <aside className="bg-red-100 p-4">Left Sidebar</aside>
      <main className="p-8 space-y-6 max-w-4xl mx-auto w-full">
        {/* Assistant Header */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-5">
          <h2 className="text-lg font-semibold text-[#006400]">Doña Assistant</h2>

          {/* Welcome Message */}
          <div className="bg-gray-100 rounded-lg px-4 py-3 max-w-[75%] text-sm text-gray-700 shadow-sm">
            How can I help you today?
          </div>

          {/* Suggested Questions */}
          <div className="flex flex-wrap gap-2">
            {[
              "Margin for vinegar",
              "Top reps this week",
              "Inventory at risk",
              "Production plan for Chiriquí"
            ].map((item) => (
              <button
                key={item}
                className="bg-[#FFF9C4] text-gray-700 text-sm rounded-full px-4 py-1 hover:shadow transition-all"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 shadow-sm bg-white mt-4">
            <input
              type="text"
              placeholder="Ask about any KPI…"
              className="flex-1 outline-none text-sm bg-transparent placeholder:text-gray-400"
            />
            <button className="ml-2 bg-[#FFD700] text-white rounded-full p-2 hover:scale-105 transition-transform">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.94 2.94a.75.75 0 011.06 0l12.02 12.02a.75.75 0 11-1.06 1.06L2.94 4a.75.75 0 010-1.06zM3 10a7 7 0 1114 0 7 7 0 01-14 0z" />
              </svg>
            </button>
          </div>
        </section>
      </main>
      <aside className="bg-blue-100 p-4">Right Insights Panel</aside>
    </div>
  );
}
