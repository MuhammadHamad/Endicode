import { motion } from "framer-motion";
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
    <footer className="border-t border-border/20 py-12 gradient-mesh relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-4 ml-1 md:ml-2">
              <motion.a 
                href="https://endicode.com" 
                aria-label="Endicode home"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={logo2} alt="Endicode" className="logo-monochrome h-12 w-auto transform origin-center scale-[2.0] md:scale-[2.2] lg:scale-[2.8] xl:scale-[3.0] transition-transform duration-300" />
              </motion.a>
            </div>
            <div className="flex space-x-4">
              {[
                { icon: Twitter, href: "#", testId: "link-twitter" },
                { icon: Linkedin, href: "#", testId: "link-linkedin" },
                { icon: Github, href: "#", testId: "link-github" },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="text-muted-foreground hover:text-foreground transition-colors glass-card rounded-lg p-2"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    data-testid={social.testId}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link href={link.href}>
                    <motion.span 
                      className="text-muted-foreground hover:text-foreground transition-colors inline-block cursor-pointer"
                      whileHover={{ x: 5 }}
                      data-testid={`footer-link-${link.name.toLowerCase().replace(' ', '-')}`}
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-3 text-sm">
              {supportLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <Link href={link.href}>
                    <motion.span 
                      className="text-muted-foreground hover:text-foreground transition-colors inline-block cursor-pointer"
                      whileHover={{ x: 5 }}
                      data-testid={`footer-support-${link.name.toLowerCase().replace(' ', '-')}`}
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-border/20 pt-8 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Made with <motion.span 
            className="inline-block"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
          >♥</motion.span> by Endicode © 2024. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}
