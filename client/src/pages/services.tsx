import { motion } from "framer-motion";
import { Code, Zap, Brain, Check, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Container from "@/components/container";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MagneticButton from "@/components/magnetic-button";

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
    color: "from-electric-blue to-blue-600"
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
    color: "from-secondary to-green-500"
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
    color: "from-purple-500 to-pink-500"
  }
];

export default function Services() {
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
              Services that <span className="text-electric-blue">scale</span>
            </motion.h1>
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
                  <div className={`space-y-6 ${!isEven ? 'lg:col-start-2' : ''}`}>
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <h2 className="font-display font-bold text-3xl mb-4">{service.title}</h2>
                      <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">What's included:</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center space-x-3">
                            <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span 
                            key={tech}
                            className="px-3 py-1 bg-muted rounded-full text-sm text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <MagneticButton asChild>
                      <Link href="/contact">
                        <Button className="bg-primary text-primary-foreground">
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </MagneticButton>
                  </div>

                  {/* Visual */}
                  <div className={!isEven ? 'lg:col-start-1' : ''}>
                    <Card className="glass-card p-8 hover:shadow-2xl transition-all duration-500">
                      <CardContent className="space-y-6">
                        <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted/20 rounded-xl flex items-center justify-center">
                          <Icon className={`w-20 h-20 bg-gradient-to-br ${service.color} bg-clip-text text-transparent`} />
                        </div>
                        <div className="text-center">
                          <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
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
              <MagneticButton asChild>
                <Link href="/contact">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:shadow-xl transition-all duration-300">
                    Book Discovery Call
                  </Button>
                </Link>
              </MagneticButton>
              <MagneticButton asChild>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="glass-card hover:shadow-xl transition-all duration-300">
                    Try Demo
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
