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
    setupCost: "2,500",
    monthlyCost: "1,000",
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
    setupCost: "7,500",
    monthlyCost: "3,000",
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

export default function PricingSection() {
  return (
    <Section>
      <Container>
        <div className="text-center mb-16">
          <motion.h2
            className="font-display font-bold text-4xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-electric-blue">Transparent</span> pricing
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Month to month. Upgrade when the work justifies it.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-electric-blue text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`glass-card h-full hover:shadow-2xl transition-all duration-500 ${plan.popular ? 'border-electric-blue/50' : ''}`}>
                <CardHeader className="text-center">
                  <CardTitle className="font-display font-bold text-2xl mb-2">{plan.name}</CardTitle>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  
                  <div className="space-y-1">
                    <div className="text-3xl font-bold">
                      <span className="text-muted-foreground text-lg">${plan.setupCost}</span> setup
                    </div>
                    <div className="text-lg text-muted-foreground">+ ${plan.monthlyCost}/mo</div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-border/30">
                    <div className="text-sm text-muted-foreground mb-2">Ideal for:</div>
                    <div className="text-sm">{plan.ideal}</div>
                  </div>

                  <MagneticButton className="w-full">
                    <Link href="/contact" data-testid={`button-select-${plan.name.toLowerCase()}`}>
                      <Button 
                        className={`w-full ${plan.popular ? 'bg-electric-blue text-white' : 'bg-border text-foreground hover:bg-muted'} transition-colors`}
                        size="lg"
                      >
                        {plan.name === 'Scale' ? 'Contact Sales' : 'Get Started'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </MagneticButton>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pricing Note */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-muted-foreground">
            Transparent, month to month. Upgrade when the work justifies it.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
