import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";


// ✅ Import local images from src/assets
import logo2 from "@/assets/logo2.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Process", href: "/process" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function MobileMenuPortal({ children }: { children: React.ReactNode }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const firstFocusableRef = useRef<HTMLElement | null>(null);

  // body classes + scroll lock + mobile-menu-open (for hiding other CTAs if needed)
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    document.body.classList.toggle("mobile-menu-open", open);
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.body.classList.remove("mobile-menu-open");
    };
  }, [open]);

  // focus first focusable inside menu when opened
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      const el =
        firstFocusableRef.current ??
        (document.querySelector(
          "#mobile-menu a, #mobile-menu button, #mobile-menu [tabindex]"
        ) as HTMLElement | null);
      el?.focus?.();
    }, 40);
    return () => clearTimeout(timer);
  }, [open]);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[2000] border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <motion.a 
            href="https://endicode.com" 
            data-testid="logo-link" 
            aria-label="Endicode home" 
            className="cursor-pointer ml-1 md:ml-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <img
              src={logo2}
              alt="Endicode"
              className="logo-monochrome h-12 w-auto transform origin-center scale-[2.0] md:scale-[2.2] lg:scale-[2.8] xl:scale-[3.0] transition-transform duration-300"
            />
          </motion.a>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-4 lg:gap-8"
            aria-label="Primary"
          >
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.2 }}
              >
                <Link href={item.href}>
                  <motion.span
                    className={`text-xs lg:text-sm font-medium transition-colors relative ${
                      location === item.href
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {item.name}
                    {location === item.href && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-electric-blue"
                        layoutId="activeTab"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </nav>

           {/* Desktop CTA */}
           <motion.div 
             className="hidden md:flex items-center gap-4"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4 }}
           >
             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
               <Button
                 asChild
                 className="bg-primary text-primary-foreground hover:shadow-lg text-sm px-4 py-2"
               >
                 <a
                   href="https://wa.me/923339535430?text=Hi%20Endicode%2C%20I%27m%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20my%20project."
                   target="_blank"
                   rel="noopener noreferrer"
                 >
                   Chat on WhatsApp
                 </a>
               </Button>
             </motion.div>
           </motion.div>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative z-[2100]"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu rendered into a portal at body to avoid stacking/clip issues */}
      <AnimatePresence>
        {open && (
          <MobileMenuPortal>
            {/* backdrop */}
            <motion.div
              id="mobile-menu"
              aria-modal="true"
              role="dialog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] md:hidden"
              onClick={() => setOpen(false)}
            >
              {/* Blurred background (covers whole viewport) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur"
              />

              {/* Enhanced Sliding panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-[10000] h-full w-full flex flex-col glass-card"
                aria-label="Mobile Primary"
              >
                <div className="flex items-center justify-between px-4 py-4 border-b border-border/50">
                  <motion.img 
                    src={logo2} 
                    alt="Endicode emblem" 
                    className="logo-monochrome h-12 w-auto transform origin-center scale-[2.0] md:scale-[2.4]"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  />
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpen(false)}
                      aria-label="Close menu"
                    >
                      <X className="w-6 h-6" />
                    </Button>
                  </motion.div>
                </div>

                <nav className="flex-1 overflow-y-auto px-6 py-6">
                  <ul className="flex flex-col gap-4">
                    {navigation.map((item, idx) => (
                      <motion.li 
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                      >
                        <Link href={item.href}>
                          <motion.a
                            onClick={() => setOpen(false)}
                            ref={
                              idx === 0 ? (firstFocusableRef as any) : undefined
                            }
                            className={`text-xl font-semibold block py-3 px-4 rounded-lg transition-colors ${
                              location === item.href
                                ? "text-foreground bg-primary/10"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                            }`}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {item.name}
                          </motion.a>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <motion.div 
                  className="px-6 pb-8 flex justify-end items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                    <a
                      href="https://wa.me/923339535430?text=Hi%20Endicode%2C%20I%27m%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20my%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="block w-full"
                    >
                      <Button className="w-full bg-primary text-primary-foreground py-3 px-4 text-base font-semibold">
                        Chat on WhatsApp
                      </Button>
                    </a>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </MobileMenuPortal>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
