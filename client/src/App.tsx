import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import OnboardingNew from "@/pages/onboarding-new";
import OnboardingDataForm from "@/pages/OnboardingDataForm";
import TableConfigDemo from "@/pages/table-config-demo";
import BusinessContextPrompts from "@/pages/BusinessContextPrompts";
import Chat from "@/pages/chat-clean-top";
import SmoothChat from "@/pages/chat-smooth";
import SidebarLayout from "@/components/sidebar-layout";
import NotFound from "@/pages/not-found";
import ProtectedRoute from "@/components/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/onboarding" component={OnboardingNew} />
      <Route path="/onboarding/data" component={OnboardingDataForm} />
      <Route path="/onboarding/context" component={BusinessContextPrompts} />
      <Route path="/table-demo" component={TableConfigDemo} />
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/chat-clean-top">
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>
      </Route>
      <Route path="/sidebar">
        <ProtectedRoute>
          <SidebarLayout />
        </ProtectedRoute>
      </Route>
      <Route path="/smooth">
        <ProtectedRoute>
          <SmoothChat />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
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
