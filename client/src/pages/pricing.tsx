import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Container from "@/components/container";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Badge import removed - not needed for contact-based approach

// Pricing plans removed - now using contact-based approach

// FAQ section removed - simplified contact-based approach

export default function Pricing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <Section className="gradient-mesh">
        <Container>
          <div className="text-center mb-16">
            <motion.h1
              className="font-display font-bold text-5xl lg:text-6xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-electric-blue">Custom</span> pricing
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Every project is unique. Contact us for a custom quote tailored to your specific needs and requirements.
            </motion.p>
          </div>
        </Container>
      </Section>

      {/* Pricing Cards */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card className="glass-card">
              <CardContent className="p-12 text-center">
                <motion.h2
                  className="font-display font-bold text-3xl mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Let's discuss your project
                </motion.h2>
                <motion.p
                  className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Every automation project is unique. We provide custom quotes based on your specific requirements, 
                  timeline, and scope. No one-size-fits-all pricing - just honest, transparent quotes.
                </motion.p>
                
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <a 
                      href="https://wa.me/923339535430?text=Hi%20Endicode%2C%20I%27d%20like%20to%20get%20a%20quote%20for%20my%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block"
                    >
                      <Button size="lg" className="w-full bg-primary text-primary-foreground hover:shadow-xl transition-all duration-300">
                        Get a Quote
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </motion.div>
                  <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/contact">
                      <Button size="lg" variant="outline" className="w-full glass-card hover:shadow-xl transition-all duration-300">
                        Send Details
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </div>

        </Container>
      </Section>
    </motion.div>
  );
}
