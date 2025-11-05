import { Link } from "wouter";
import { Twitter, Linkedin, Github } from "lucide-react";
import logo2 from "@/assets/logo2.png";

const quickLinks = [
  { name: "Services", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
];

const supportLinks = [
  { name: "Contact", href: "/contact" },
  { name: "Documentation", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4 ml-1 md:ml-2">
              <a href="https://endicode.com" aria-label="Endicode home">
                <img src={logo2} alt="Endicode" className="h-12 w-auto transform origin-center scale-[2.0] md:scale-[2.2] lg:scale-[2.8] xl:scale-[3.0]" />
              </a>
            </div>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-github"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    data-testid={`footer-link-${link.name.toLowerCase().replace(' ', '-')}`}
                  >
                    <span className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    data-testid={`footer-support-${link.name.toLowerCase().replace(' ', '-')}`}
                  >
                    <span className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/20 pt-8 text-center text-sm text-muted-foreground">
          Made with ♥ by Endicode © 2024. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
