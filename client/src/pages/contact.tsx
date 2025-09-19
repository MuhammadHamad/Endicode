import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Container from "@/components/container";
import Section from "@/components/section";
import ContactForm from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MagneticButton from "@/components/magnetic-button";

export default function Contact() {
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
              Let's make your <span className="text-electric-blue">ops flow</span>
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Ready to automate the work and accelerate growth? Let's discuss your project and see how we can help.
            </motion.p>
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-card">
                <CardContent className="p-8">
                  <h2 className="font-display font-bold text-2xl mb-6">Send us a message</h2>
                  <ContactForm />
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Quick Call Option */}
              <Card className="glass-card">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-electric-blue to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Prefer to talk?</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Connect with us on WhatsApp to discuss your project in detail.
                  </p>
                  <MagneticButton asChild>
                    <Button asChild className="w-full bg-primary text-primary-foreground">
                      <a 
                        href="https://wa.me/923339535430?text=Hi%20Endicode%2C%20I%27m%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20my%20project."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                        data-testid="button-whatsapp-contact"
                      >
                        Chat on WhatsApp
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </MagneticButton>
                </CardContent>
              </Card>

              {/* Response Times */}
              <Card className="glass-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Response Times</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Initial response</span>
                      <span className="text-sm font-medium">Within 4 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Detailed proposal</span>
                      <span className="text-sm font-medium">Within 24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">WhatsApp chat</span>
                      <span className="text-sm font-medium">Same week</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What Happens Next */}
              <Card className="glass-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">What happens next?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-electric-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-white">1</span>
                      </div>
                      <div>
                        <div className="font-medium text-sm">Quick Response</div>
                        <div className="text-xs text-muted-foreground">We'll respond within 4 hours with initial thoughts</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-electric-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-white">2</span>
                      </div>
                      <div>
                        <div className="font-medium text-sm">WhatsApp Contact</div>
                        <div className="text-xs text-muted-foreground">Direct messaging to understand your needs</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-black">3</span>
                      </div>
                      <div>
                        <div className="font-medium text-sm">Custom Proposal</div>
                        <div className="text-xs text-muted-foreground">Detailed plan with timeline and pricing</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Try Demo CTA */}
      <Section className="border-t border-border/20">
        <Container>
          <div className="text-center">
            <motion.h2
              className="font-display font-bold text-4xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              See automation in action
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Try our live automation demo to see the kind of intelligent workflows we build.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MagneticButton asChild>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="glass-card hover:shadow-xl transition-all duration-300">
                    Try Automation Demo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
}
