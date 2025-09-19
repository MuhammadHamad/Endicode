import { motion } from "framer-motion";
import { Check, ArrowRight, Star } from "lucide-react";
import { Link } from "wouter";
import Container from "@/components/container";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MagneticButton from "@/components/magnetic-button";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small teams getting started",
    setupCost: "1,800",
    monthlyCost: "750",
    popular: false,
    features: [
      "40 hours development",
      "2 automation workflows",
      "48hr response time",
      "Basic monitoring",
      "Email support",
      "Monthly strategy call"
    ],
    ideal: "Small businesses, startups, single workflows"
  },
  {
    name: "Growth", 
    description: "For scaling teams with complex needs",
    setupCost: "5,500",
    monthlyCost: "2,200",
    popular: true,
    features: [
      "120 hours development",
      "8 automation workflows",
      "24hr response time", 
      "Advanced monitoring & alerts",
      "AI assistant integration",
      "Priority support",
      "Weekly strategy calls",
      "Performance reporting"
    ],
    ideal: "Growing companies, multiple departments, complex workflows"
  },
  {
    name: "Scale",
    description: "Enterprise solutions for complex operations",
    setupCost: "Custom",
    monthlyCost: "Based on scope",
    popular: false,
    features: [
      "Unlimited development hours",
      "Custom automation suite",
      "4hr response time",
      "24/7 monitoring",
      "Dedicated support team",
      "Custom integrations",
      "Enterprise security",
      "SLA guarantees"
    ],
    ideal: "Enterprises, mission-critical systems, high-volume operations"
  }
];

const faqs = [
  {
    question: "What's included in the setup cost?",
    answer: "Initial discovery, architecture design, core development, testing, and deployment. You get a fully functional system ready to use."
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Absolutely. We believe in transparent, month-to-month pricing. Upgrade when the work justifies it, downgrade if your needs change."
  },
  {
    question: "What if I need more automation workflows?",
    answer: "Additional workflows can be added à la carte at $1,200 each for simple workflows or $2,800 for complex multi-step automations."
  },
  {
    question: "Do you offer custom enterprise solutions?",
    answer: "Yes, our Scale plan is fully customizable for enterprise needs including custom SLAs, dedicated teams, and specialized security requirements."
  }
];

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
                  <MagneticButton className="flex-1">
                    <a 
                      href="https://wa.me/923339535430?text=Hi%20Endicode%2C%20I%27d%20like%20to%20get%20a%20quote%20for%20my%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button size="lg" className="w-full bg-primary text-primary-foreground hover:shadow-xl transition-all duration-300">
                        Get a Quote
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </MagneticButton>
                  <MagneticButton className="flex-1" asChild>
                    <Link href="/contact">
                      <Button size="lg" variant="outline" className="w-full glass-card hover:shadow-xl transition-all duration-300">
                        Send Details
                      </Button>
                    </Link>
                  </MagneticButton>
                </motion.div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Note */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm text-muted-foreground">
              All plans include ongoing support and maintenance. Cancel anytime with 30-day notice.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="border-t border-border/20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <motion.h2
              className="font-display font-bold text-3xl text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Frequently Asked Questions
            </motion.h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass-card hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="gradient-mesh">
        <Container>
          <div className="text-center">
            <motion.h2
              className="font-display font-bold text-4xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to choose your plan?
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Start with a discovery call to find the perfect fit for your needs.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MagneticButton asChild>
                <Link href="/contact">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:shadow-xl transition-all duration-300">
                    Book Discovery Call
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
