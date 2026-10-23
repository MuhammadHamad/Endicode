import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import OpensInNewTab from "@/components/opens-in-new-tab";
import { WHATSAPP_URL } from "@/lib/utils";


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

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  // Set when a menu link closes the menu, so focus goes to the new page instead of the toggle.
  const navigatedRef = useRef(false);

  // Close the menu on any route change, including back/forward.
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Close it when the viewport grows to the desktop layout, where the toggle is hidden.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  const closeForNavigation = () => {
    navigatedRef.current = true;
    setOpen(false);
  };

  return (
    // z-40: above page content (z-10) but below Radix layers (dialogs, the menu
    // sheet, selects: z-50; toasts: z-100), so a tall dialog isn't covered by the bar.
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
      style={{ willChange: "backdrop-filter" }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4">
        <div className="flex items-center justify-between">
          {/* Brand — client-side link; App scrolls to the top on every navigation */}
          <Link
            href="/"
            data-testid="logo-link"
            aria-label="Endicode home"
            className="cursor-pointer ml-1 md:ml-2 inline-block"
          >
            <img
              src={logo2}
              alt="Endicode"
              className="logo-monochrome h-12 w-auto transform origin-center scale-[2.0] md:scale-[2.2] lg:scale-[2.8] xl:scale-[3.0] transition-transform duration-300"
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-4 lg:gap-8"
            aria-label="Primary"
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={location === item.href ? "page" : undefined}
              >
                <span
                  className={`text-xs lg:text-sm font-medium transition-colors relative inline-block hover:-translate-y-0.5 hover:transition-transform ${
                    location === item.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                  {location === item.href && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-electric-blue"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </span>
              </Link>
            ))}
          </nav>

           {/* Desktop CTA */}
           <div className="hidden md:flex items-center gap-4">
             <Button
               asChild
               className="bg-primary text-primary-foreground hover:shadow-lg text-sm px-4 py-2"
             >
               <a
                 href={WHATSAPP_URL}
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 Chat on WhatsApp
                 <OpensInNewTab />
               </a>
             </Button>
           </div>

          {/* Mobile menu: a Radix dialog, so it traps focus, closes on Escape and
              returns focus to the toggle. */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              hideClose
              aria-describedby={undefined}
              className="flex w-full flex-col gap-0 border-l-0 p-0 sm:max-w-none"
              onCloseAutoFocus={(event) => {
                if (!navigatedRef.current) return;
                // A link closed the menu: start keyboard and screen-reader users
                // at the new page's content rather than back on the toggle.
                navigatedRef.current = false;
                event.preventDefault();
                document.getElementById("main")?.focus({ preventScroll: true });
              }}
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex items-center justify-between px-4 py-4 border-b border-border/50">
                <img
                  src={logo2}
                  alt=""
                  className="logo-monochrome h-12 w-auto transform origin-center scale-[2.0] md:scale-[2.4]"
                />
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close menu">
                    <X className="w-6 h-6" aria-hidden="true" />
                  </Button>
                </SheetClose>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-6" aria-label="Primary">
                <ul className="flex flex-col gap-4">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={closeForNavigation}
                        aria-current={location === item.href ? "page" : undefined}
                        className={`text-xl font-semibold block py-3 px-4 rounded-lg transition-colors ${
                          location === item.href
                            ? "text-foreground bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="px-6 pb-8">
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground py-3 px-4 text-base font-semibold"
                >
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    Chat on WhatsApp
                    <OpensInNewTab />
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
