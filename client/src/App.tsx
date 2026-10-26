import { Suspense, useEffect, useRef } from "react";
import { Router as WouterRouter, Switch, Route, useLocation, type AroundNavHandler } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { lazyWithPreload } from "@/lib/lazy-with-preload";

// Lazy-load non-Home routes so the initial bundle stays small.
const Services = lazyWithPreload(() => import("@/pages/services"));
const CaseStudies = lazyWithPreload(() => import("@/pages/case-studies"));
const Process = lazyWithPreload(() => import("@/pages/process"));
const Pricing = lazyWithPreload(() => import("@/pages/pricing"));
const About = lazyWithPreload(() => import("@/pages/about"));
const Contact = lazyWithPreload(() => import("@/pages/contact"));
const Demo = lazyWithPreload(() => import("@/pages/demo"));
const Privacy = lazyWithPreload(() => import("@/pages/privacy"));
const Terms = lazyWithPreload(() => import("@/pages/terms"));

const lazyRoutes = [Services, CaseStudies, Process, Pricing, About, Contact, Demo, Privacy, Terms];

// Download every route's code once the browser is idle after the first page,
// so clicking a link renders the next page immediately instead of waiting on
// the network (and briefly showing an empty page with the footer pulled up).
function usePreloadRoutes() {
  useEffect(() => {
    const preloadAll = () => lazyRoutes.forEach((route) => void route.preload().catch(() => {}));
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(preloadAll, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(preloadAll, 2000);
    return () => clearTimeout(id);
  }, []);
}

// Every in-app navigation (<Link> or navigate()) lands at the top of the page,
// like a full page load would. Back/forward doesn't go through here, so the
// browser still restores the previous scroll position.
const scrollToTopOnNav: AroundNavHandler = (navigate, to, options) => {
  navigate(to, options);
  // "instant" because html has scroll-behavior: smooth.
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
};

// After a route change, move focus to <main>, so keyboard and screen-reader
// users start on the new page instead of the link they followed. A dialog
// that's closing (the mobile menu) does this itself once it has unmounted.
function useFocusMainOnRouteChange() {
  const [location] = useLocation();
  const previous = useRef(location);

  useEffect(() => {
    if (location === previous.current) return;
    previous.current = location;
    if (document.activeElement?.closest('[role="dialog"]')) return;
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [location]);
}

function Layout() {
  useFocusMainOnRouteChange();
  usePreloadRoutes();

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="pt-20 focus:outline-none">
        <Router />
      </main>
      <Footer />

      <Toaster />
    </div>
  );
}

function Router() {
  return (
    // A screen-tall placeholder while a page's code is still loading (first
    // visit, slow network): with no fallback, <main> collapsed to nothing and
    // the footer jumped up under the navbar until the page arrived.
    <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/case-studies" component={CaseStudies} />
        <Route path="/process" component={Process} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/demo" component={Demo} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <HelmetProvider>
      {/* framer-motion ignores the CSS prefers-reduced-motion rule; this makes
          its JS animations skip transforms for users who ask for less motion. */}
      <MotionConfig reducedMotion="user">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <WouterRouter aroundNav={scrollToTopOnNav}>
              <Layout />
            </WouterRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </MotionConfig>
    </HelmetProvider>
  );
}

export default App;
