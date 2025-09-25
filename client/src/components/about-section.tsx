import { motion } from "framer-motion";
import { Code, Zap, TrendingUp } from "lucide-react";
import Container from "@/components/container";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";

const founders = [
  {
    name: "Muhammad Hammad",
    role: "Co-founder",
    description: "Automation engineer building reliable, scalable workflows",
    icon: Code,
    color: "from-electric-blue to-blue-600",
    discipline: "Automation"
  },
  {
    name: "Muhammad Owais", 
    role: "Co-founder",
    description: "Full-stack engineer focused on robust, high-performance systems",
    icon: Zap,
    color: "from-secondary to-green-500",
    discipline: "Engineering"
  },
  {
    name: "Abbas Ali",
    role: "Co-founder", 
    description: "Business and go-to-market lead",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-500",
    discipline: "Business"
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

export default function AboutSection() {
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
            We're <span className="text-electric-blue">builders</span> first
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A modern build-and-automate studio. Then we make the work disappear.
          </motion.p>
        </div>
        
        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
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
                    <p className="text-muted-foreground text-sm mb-2">{founder.role}</p>
                    {founder.discipline ? (
                      <div className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-electric-blue/10 text-electric-blue mb-2">
                        {founder.discipline}
                      </div>
                    ) : null}
                    {founder.description ? (
                      <p className="text-xs text-muted-foreground">{founder.description}</p>
                    ) : null}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        
        {/* Principles */}
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
  );
}
