import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/magnetic-button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Process", href: "/process" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Lock scroll when open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link href="/" data-testid="logo-link" aria-label="Endicode home">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-blue to-secondary grid place-items-center">
                <span className="text-sm font-bold text-white">E</span>
              </div>
              <span className="font-display font-bold text-xl">Endicode</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span
                  className={`text-sm font-medium transition-colors hover:text-foreground ${
                    location === item.href ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <MagneticButton asChild>
              <Button asChild className="bg-primary text-primary-foreground hover:shadow-lg">
                <a
                  href="https://wa.me/923339535430?text=Hi%20Endicode%2C%20I%27m%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20my%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </Button>
            </MagneticButton>
          </div>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile full-screen drawer */}
      <AnimatePresence>
        {open && (
          <motion.aside
            id="mobile-menu"
            aria-modal="true"
            role="dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden bg-black/90"
            onClick={() => setOpen(false)}
          >
            <div
              className="h-full w-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-blue to-secondary grid place-items-center">
                    <span className="text-sm font-bold text-white">E</span>
                  </div>
                  <span className="font-display font-bold text-xl text-white">Endicode</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close menu">
                  <X className="w-6 h-6 text-white" />
                </Button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-6" aria-label="Mobile Primary">
                <ul className="flex flex-col gap-6">
                  {navigation.map((item, idx) => (
                    <li key={item.name}>
                      <Link href={item.href} onClick={() => setOpen(false)}>
                        <span
                          ref={idx === 0 ? firstLinkRef : undefined}
                          className={`text-xl font-semibold ${
                            location === item.href ? "text-white" : "text-white/85"
                          }`}
                        >
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="px-6 pb-8">
                <a
                  href="https://wa.me/923339535430?text=Hi%20Endicode%2C%20I%27m%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20my%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block"
                >
                  <div className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-md text-center font-semibold shadow-md">
                    Chat on WhatsApp
                  </div>
                </a>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}
