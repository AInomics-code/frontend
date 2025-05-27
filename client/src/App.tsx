import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Chat from "@/pages/chat-perplexity";
import SidebarLayout from "@/components/sidebar-layout";
import NotFound from "@/pages/not-found";
import laDonaLogo from "@assets/Screenshot 2025-05-19 alle 15.08.46.png";

function Router() {
  return (
    <div className="flex">
      {/* Always show sidebar */}
      <div className="fixed top-0 left-0 h-screen w-20 bg-[#f5f5f5] border-r border-[#e0e0e0] flex flex-col items-center py-4" style={{ zIndex: 9999 }}>
        {/* La Doña logo */}
        <div className="mb-6 p-2">
          <img
            src={laDonaLogo}
            alt="La Doña"
            className="h-12 w-auto object-contain rounded-lg"
          />
        </div>

        {/* Plus Button */}
        <div className="mb-8">
          <button className="w-12 h-12 rounded-xl bg-white hover:bg-[#f0f0f0] flex items-center justify-center text-[#7a7a7a] transition-all duration-300 shadow-sm border border-[#e0e0e0]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col space-y-6">
          <button className="flex flex-col items-center justify-center text-[#7a7a7a] hover:text-[#d32f2f] transition-colors duration-300 mb-6 hover:bg-white rounded-xl p-3 hover:shadow-sm group">
            <div className="flex items-center justify-center mb-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-xs">Home</span>
          </button>

          <button className="flex flex-col items-center space-y-2 text-gray-400 hover:text-white transition-colors group">
            <div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
            </div>
            <span className="text-xs">Scopri</span>
          </button>

          <button className="flex flex-col items-center space-y-2 text-gray-400 hover:text-white transition-colors group">
            <div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <span className="text-xs">Spazi</span>
        </button>
      </div>

      {/* User badge at bottom */}
      <div className="mt-auto">
        <div className="relative mb-4">
          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            E
          </div>
          <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded text-[10px] font-bold">
            PRO
          </div>
        </div>
        <div className="w-3 h-3 rounded-full bg-orange-500 mx-auto"></div>
      </div>
    </div>

    {/* Main content with margin */}
    <div className="ml-20 flex-1">
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/chat" component={SidebarLayout} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
