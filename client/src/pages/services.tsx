import { motion, useReducedMotion } from "framer-motion";
import { Code, Zap, Brain, Check, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Container from "@/components/container";
import OpensInNewTab from "@/components/opens-in-new-tab";
import Seo from "@/components/seo";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Code,
    title: "Web & App Development",
    description: "Next.js, React Native, robust backends. Built for speed and scale.",
    features: [
      "Lightning-fast web applications",
      "Cross-platform mobile apps", 
      "Scalable API infrastructure",
      "Performance optimization",
      "Security-first architecture"
    ],
    technologies: ["Next.js", "React Native", "Node.js", "TypeScript", "PostgreSQL"],
    color: "from-electric-blue to-blue-600",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: Zap,
    title: "Process Automation",
    description: "From lead triage to invoice parsing. Connect everything, automate anything.",
    features: [
      "Workflow orchestration",
      "Data synchronization",
      "Custom integrations",
      "Real-time monitoring",
      "Error handling & recovery"
    ],
    technologies: ["Zapier", "n8n", "Custom APIs", "Webhooks", "Event Streams"],
    color: "from-secondary to-green-500",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: Brain,
    title: "AI Assistants",
    description: "Support bots, routing, internal copilots. Smart automation that learns.",
    features: [
      "Customer support bots",
      "Lead qualification systems",
      "Internal knowledge assistants",
      "Natural language processing",
      "Machine learning models"
    ],
    technologies: ["OpenAI", "Anthropic", "LangChain", "Vector DBs", "RAG"],
    color: "from-purple-500 to-pink-500",
    image:
      "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=1200&q=80",
  }
];

export default function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <Seo path="/services" />
      {/* Hero Section: neither the <h1> nor its wrappers fade in, so it shows on first paint */}
      <Section className="gradient-mesh" fadeIn={false}>
        <Container>
          <div className="text-center mb-16">
            <h1 className="font-display font-bold text-5xl lg:text-6xl mb-6">
              Services that <span className="text-electric-blue">scale</span>
            </h1>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              We build, automate, and optimize so you can focus on what matters most - growing your business.
            </motion.p>
          </div>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section>
        <Container>
          <div className="space-y-20">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={service.title}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  {/* Content */}
                  <motion.div 
                    className={`space-y-6 ${!isEven ? 'lg:col-start-2' : ''}`}
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                    </motion.div>
                    
                    <div>
                      <h2 className="font-display font-bold text-3xl mb-4">{service.title}</h2>
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">What's included:</h3>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <motion.li 
                            key={feature} 
                            className="flex items-center space-x-3"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + idx * 0.05 }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Check className="w-5 h-5 text-secondary flex-shrink-0" aria-hidden="true" />
                            </motion.div>
                            <span className="text-muted-foreground">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, idx) => (
                          <motion.span 
                            key={tech}
                            className="px-3 py-1 bg-muted rounded-full text-sm text-foreground glass-card"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + idx * 0.05, type: "spring", stiffness: 200 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <Button asChild className="bg-primary text-primary-foreground group">
                      <Link href="/contact">
                        Get Started
                        {/* The nudge loops forever, so it only runs for people who haven't asked for less motion. */}
                        <motion.span
                          aria-hidden="true"
                          animate={reduceMotion ? undefined : { x: [0, 5, 0] }}
                          transition={reduceMotion ? undefined : { duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </motion.span>
                      </Link>
                    </Button>
                  </motion.div>

                  {/* Visual */}
                  <motion.div 
                    className={!isEven ? 'lg:col-start-1' : ''}
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  >
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="glass-card p-8 relative overflow-hidden group">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-electric-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          initial={false}
                        />
                        <CardContent className="space-y-6 relative z-10">
                          <motion.div 
                            className="aspect-video rounded-xl overflow-hidden relative"
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                          >
                            {/* Decorative stock photo: the card repeats the service name below it. */}
                            <img
                              src={service.image}
                              alt=""
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                          </motion.div>
                          <div className="text-center">
                            <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
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
              Ready to get started?
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Let's discuss your project and see how we can help.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:shadow-xl transition-all duration-300">
                <a href="https://wa.me/923339535430?text=Hi%20Endicode%2C%20I%27m%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20my%20project." target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                  <OpensInNewTab />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="glass-card hover:shadow-xl transition-all duration-300">
                <Link href="/demo">
                  Try Demo
                </Link>
              </Button>
            </motion.div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
