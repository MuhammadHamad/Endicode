import { motion } from "framer-motion";
import { Code, Zap, Brain, Check } from "lucide-react";
import Section from "@/components/section";
import Container from "@/components/container";

const services = [
  {
    icon: Code,
    title: "Web & App Development",
    description: "Next.js, React Native, robust backends. Built for speed and scale.",
    features: [
      "Lightning-fast web applications",
      "Cross-platform mobile apps",
      "Scalable API infrastructure"
    ],
    color: "from-electric-blue to-blue-600"
  },
  {
    icon: Zap,
    title: "Process Automation",
    description: "From lead triage to invoice parsing. Connect everything, automate anything.",
    features: [
      "Workflow orchestration",
      "Data synchronization", 
      "Custom integrations"
    ],
    color: "from-secondary to-green-500"
  },
  {
    icon: Brain,
    title: "AI Assistants",
    description: "Support bots, routing, internal copilots. Smart automation that learns.",
    features: [
      "Customer support bots",
      "Lead qualification systems",
      "Internal knowledge assistants"
    ],
    color: "from-purple-500 to-pink-500"
  }
];

const timeline = [
  { step: "1", title: "Discovery & Strategy", description: "Process mapping and technical architecture" },
  { step: "2", title: "Core Development", description: "MVP build with essential features" },
  { step: "3", title: "Automation Layer", description: "Key workflows automated and tested" },
  { step: "4", title: "Launch & Training", description: "Go-live support and team onboarding" }
];

export default function ServicesSection() {
  return (
    <Section id="services" className="gradient-mesh">
      <Container>
        <div className="text-center mb-16">
          <motion.h2
            className="font-display font-bold text-4xl lg:text-5xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            data-testid="services-title"
          >
            From <span className="text-electric-blue">clicking around</span> to <span className="text-secondary">clicking 'done'</span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We build the tools and wire the automations that make your team unstoppable.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                className="glass-card rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`service-${service.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-2xl mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-secondary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
        
        {/* What you get timeline */}
        <div>
          <motion.h3
            className="font-display font-bold text-3xl text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What you get in 30 days
          </motion.h3>
          <div className="grid md:grid-cols-4 gap-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`timeline-step-${item.step}`}
              >
                <div className={`w-12 h-12 ${item.step === "4" ? "bg-secondary" : "bg-electric-blue"} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className={`font-bold ${item.step === "4" ? "text-black" : "text-white"}`}>{item.step}</span>
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
