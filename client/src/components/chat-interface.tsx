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
      {/* Left Sidebar - 240px */}
      <div className="bg-white border-r border-gray-200 overflow-y-auto xl:block hidden">
        <Sidebar
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
          isOpen={true}
          onToggle={() => {}}
        />
      </div>

      {/* Center Chat Panel - Fluid with max-w-4xl */}
      <div className="flex flex-col overflow-y-auto">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 xl:hidden bg-white">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </Button>
          <h1 className="heading-primary">
            ChatGPT
          </h1>
          <div className="w-10"></div>
        </div>

        {/* Chat Content with max-width constraint */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          <MessageList conversationId={selectedConversationId} />
          <MessageInput 
            conversationId={selectedConversationId}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>

      {/* Right Context Panel - 320px */}
      <div className="bg-white shadow-inner overflow-y-auto xl:block hidden">
        <div className="p-4">
          <h3 className="heading-primary mb-4">Context Panel</h3>
          <div className="space-y-3">
            <div className="p-3 bg-info-blue rounded-lg shadow-enterprise">
              <p className="text-sm text-body">Conversation context and settings will appear here.</p>
            </div>
            <div className="p-3 bg-warning-yellow rounded-lg shadow-enterprise">
              <h4 className="text-sm font-semibold text-gray-800 mb-1">Active Features</h4>
              <p className="text-sm text-body">Additional features and tools.</p>
            </div>
            <div className="p-3 bg-light-red rounded-lg shadow-enterprise">
              <h4 className="text-sm font-semibold text-gray-800 mb-1">Risk Alerts</h4>
              <p className="text-sm text-body">Safety and compliance notifications.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 xl:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white z-30 xl:hidden">
            <Sidebar
              selectedConversationId={selectedConversationId}
              onSelectConversation={handleSelectConversation}
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
            />
          </div>
        </>
      )}
    </div>
  );
}
