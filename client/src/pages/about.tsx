import { motion } from "framer-motion";
import { Code, Zap, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Container from "@/components/container";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MagneticButton from "@/components/magnetic-button";

const founders = [
  {
    name: "Alex Chen",
    role: "Technical Co-founder",
    description: "Full-stack architect with 10+ years scaling platforms",
    icon: Code,
    color: "from-electric-blue to-blue-600",
    background: "Former senior engineer at Google and Stripe. Led technical teams building systems serving millions of users. Passionate about clean code and scalable architecture."
  },
  {
    name: "Sarah Kim", 
    role: "Automation Co-founder",
    description: "Product strategist turned automation expert",
    icon: Zap,
    color: "from-secondary to-green-500",
    background: "Ex-McKinsey consultant who discovered the power of automation while optimizing Fortune 500 operations. Now builds intelligent workflows that think ahead."
  },
  {
    name: "Marcus Johnson",
    role: "Business Co-founder", 
    description: "Growth operator with enterprise sales background",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-500",
    background: "Built and scaled sales teams at 3 unicorn startups. Understands what businesses really need to grow and how technology can get them there faster."
  }
];

const principles = [
  {
    title: "Reliable Delivery",
    description: "We ship on time, every time. No excuses, just results.",
    color: "text-electric-blue"
  },
  {
    title: "Measurable Impact", 
    description: "Every solution includes clear metrics and ROI tracking.",
    color: "text-secondary"
  },
  {
    title: "Respectful Operations",
    description: "We enhance human work, never replace human judgment.",
    color: "text-electric-blue"
  }
];

const values = [
  "Build with purpose, not just because we can",
  "Automate the boring stuff, amplify the meaningful work", 
  "Ship fast, iterate faster, but never break trust",
  "Transparent communication beats perfect code",
  "Every automation should make someone's day better"
];

export default function About() {
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
              We're <span className="text-electric-blue">builders</span> first
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              A modern build-and-automate studio. Then we make the work disappear.
            </motion.p>
          </div>
        </Container>
      </Section>

      {/* Company Story */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-bold text-4xl mb-6">Our Story</h2>
              <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                <p>
                  FoundryFlow was born from frustration. We'd spent years building incredible software that solved real problems, 
                  only to watch teams get bogged down in manual processes around the edges.
                </p>
                <p>
                  The breakthrough came when we realized that the best software isn't just well-built - it's intelligently connected. 
                  Every click saved, every process automated, every workflow optimized creates compound value that transforms how teams operate.
                </p>
                <p>
                  Today, we're obsessed with building systems that don't just work, but work <em>smarter</em>. 
                  We craft the product, then automate everything around it so your team can focus on what humans do best.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Team Section */}
      <Section className="gradient-mesh">
        <Container>
          <div className="text-center mb-16">
            <motion.h2
              className="font-display font-bold text-4xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Meet the Team
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Three perspectives, one mission: make technology work for humans.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {founders.map((founder, index) => {
              const Icon = founder.icon;
              return (
                <motion.div
                  key={founder.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  data-testid={`founder-${founder.name.toLowerCase().replace(' ', '-')}`}
                >
                  <Card className="glass-card h-full hover:shadow-2xl transition-all duration-500">
                    <CardContent className="p-8 text-center">
                      <div className={`w-24 h-24 bg-gradient-to-br ${founder.color} rounded-2xl mx-auto mb-6 flex items-center justify-center`}>
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="font-display font-semibold text-xl mb-2">{founder.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{founder.role}</p>
                      <p className="text-xs text-muted-foreground mb-4">{founder.description}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{founder.background}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Principles */}
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
              How We Work
            </motion.h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className={`font-display font-semibold text-lg mb-2 ${principle.color}`}>
                  {principle.title}
                </h3>
                <p className="text-sm text-muted-foreground">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section className="border-t border-border/20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="font-display font-bold text-3xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              What We Believe
            </motion.h2>
            
            <div className="space-y-4">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="text-lg text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  • {value}
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
              Let's build something amazing
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Ready to see what's possible when you combine great development with smart automation?
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
                    Start a Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </MagneticButton>
              <MagneticButton asChild>
                <Link href="/case-studies">
                  <Button size="lg" variant="outline" className="glass-card hover:shadow-xl transition-all duration-300">
                    See Our Work
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
