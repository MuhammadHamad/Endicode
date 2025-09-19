import { useState } from "react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" data-testid="logo-link">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-electric-blue to-secondary rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white">E</span>
              </div>
              <span className="font-display font-bold text-xl">Endicode</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}>
                <span className={`text-sm font-medium transition-colors hover:text-foreground ${
                  location === item.href ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <MagneticButton asChild>
              <Button asChild className="bg-primary text-primary-foreground hover:shadow-lg transition-all duration-300">
                <a href="https://wa.me/923339535430?text=Hi%20Endicode%2C%20I%27m%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20my%20project." target="_blank" rel="noopener noreferrer" data-testid="button-whatsapp-contact">
                  Chat on WhatsApp
                </a>
              </Button>
            </MagneticButton>
          </div>
          
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/50 mt-4 pt-4"
            >
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`mobile-nav-${item.name.toLowerCase().replace(' ', '-')}`}
                  >
                    <span className={`text-sm font-medium transition-colors ${
                      location === item.href ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {item.name}
                    </span>
                  </Link>
                ))}
                <a href="https://wa.me/923339535430?text=Hi%20Endicode%2C%20I%27m%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20my%20project." target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-button-whatsapp-contact">
                  <div className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md text-center font-medium hover:shadow-lg transition-all duration-300">
                    Chat on WhatsApp
                  </div>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
