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
                className="glass-card rounded-2xl p-8 group relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                data-testid={`service-${service.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                {/* Hover gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-electric-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
                
                <motion.div 
                  className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 relative z-10 shadow-lg`}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>
                
                <h3 className="font-display font-bold text-2xl mb-4 relative z-10 group-hover:text-electric-blue transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 relative z-10 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3 text-sm relative z-10">
                  {service.features.map((feature, idx) => (
                    <motion.li 
                      key={feature} 
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + idx * 0.05 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Check className="w-4 h-4 text-secondary" />
                      </motion.div>
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {feature}
                      </span>
                    </motion.li>
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
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-electric-blue/20 via-secondary/40 to-electric-blue/20" />
            
            {timeline.map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ y: -5 }}
                data-testid={`timeline-step-${item.step}`}
              >
                <motion.div 
                  className={`w-14 h-14 ${item.step === "4" ? "bg-secondary" : "bg-electric-blue"} rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg`}
                  whileHover={{ scale: 1.15, rotate: 360 }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200, damping: 20 }}
                >
                  <span className={`font-bold text-lg ${item.step === "4" ? "text-black" : "text-white"}`}>
                    {item.step}
                  </span>
                </motion.div>
                <h4 className="font-semibold mb-2 text-lg">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

