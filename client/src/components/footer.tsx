import { motion } from "framer-motion";
import { Link } from "wouter";
import logo2 from "@/assets/logo2.png";
import { CONTACT_EMAIL } from "@/lib/utils";

const quickLinks = [
  { name: "Services", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
];

const supportLinks = [
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/20 py-12 gradient-mesh relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4 ml-1 md:ml-2">
              <a href="https://endicode.com" aria-label="Endicode home">
                <img
                  src={logo2}
                  alt="Endicode"
                  className="logo-monochrome h-12 w-auto transform origin-center scale-[2.0] md:scale-[2.2] lg:scale-[2.8] xl:scale-[3.0] transition-transform duration-300"
                />
              </a>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Need to reach us?{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-foreground hover:text-electric-blue transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span
                      className="text-muted-foreground hover:text-foreground transition-colors inline-block cursor-pointer"
                      data-testid={`footer-link-${link.name.toLowerCase().replace(' ', '-')}`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h3 className="font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-3 text-sm">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span
                      className="text-muted-foreground hover:text-foreground transition-colors inline-block cursor-pointer"
                      data-testid={`footer-support-${link.name.toLowerCase().replace(' ', '-')}`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-border/20 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Endicode. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
