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
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-950">
      <Sidebar
        selectedConversationId={selectedConversationId}
        onSelectConversation={handleSelectConversation}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 lg:hidden">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            ChatGPT
          </h1>
          <div className="w-10"></div>
        </div>

        {/* Chat Messages Area */}
        <MessageList conversationId={selectedConversationId} />

        {/* Input Area */}
        <MessageInput 
          conversationId={selectedConversationId}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
