import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import Services from "@/pages/services";
import CaseStudies from "@/pages/case-studies";
import Process from "@/pages/process";
import Pricing from "@/pages/pricing";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Demo from "@/pages/demo";
import NotFound from "@/pages/not-found";
import { useCursorGlow } from "@/hooks/use-cursor-glow";
import { useEffect } from "react";

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/case-studies" component={CaseStudies} />
        <Route path="/process" component={Process} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/demo" component={Demo} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  const { cursorRef } = useCursorGlow();

  useEffect(() => {
    // Initialize analytics placeholder
    window._ffAnalytics = function(event: string, data?: any) {
      console.log('Analytics Event:', event, data);
    };

    // Page load analytics
    window._ffAnalytics('page_view', { page: 'app_loaded' });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground antialiased">
          {/* Cursor Glow Effect */}
          <div ref={cursorRef} className="cursor-glow" />
          
          <Navbar />
          <main className="pt-20">
            <Router />
          </main>
          <Footer />
          
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

declare global {
  interface Window {
    _ffAnalytics: (event: string, data?: any) => void;
  }
}
