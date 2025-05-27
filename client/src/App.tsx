import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { BiSidebar } from "@/components/bi-sidebar";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Chat from "@/pages/chat-perplexity";
import SidebarLayout from "@/components/sidebar-layout";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex">
      {/* BI Sidebar */}
      <BiSidebar />

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
