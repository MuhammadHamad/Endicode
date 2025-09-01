import { motion } from "framer-motion";
import { Search, Map, Hammer, Zap, GraduationCap, Clock, Target, FileText } from "lucide-react";
import { Link } from "wouter";
import Container from "@/components/container";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MagneticButton from "@/components/magnetic-button";

const processSteps = [
  {
    icon: Search,
    title: "Discover",
    goal: "Map your current state",
    artifacts: "Process documentation, technical audit, opportunity matrix",
    timeline: "2-3 days",
    description: "We dive deep into your existing workflows, identify bottlenecks, and map out automation opportunities. No stone left unturned.",
    color: "from-electric-blue to-blue-600"
  },
  {
    icon: Map,
    title: "Map",
    goal: "Design the solution",
    artifacts: "Architecture diagrams, automation blueprints, project roadmap",
    timeline: "3-5 days", 
    description: "Create a detailed plan with wireframes, technical architecture, and automation workflows tailored to your specific needs.",
    color: "from-electric-blue to-secondary"
  },
  {
    icon: Hammer,
    title: "Build",
    goal: "Develop and test",
    artifacts: "MVP application, core features, initial testing results",
    timeline: "10-15 days",
    description: "Agile development with weekly check-ins. You'll see progress every step of the way with working prototypes.",
    color: "from-secondary to-green-500"
  },
  {
    icon: Zap,
    title: "Automate",
    goal: "Wire the workflows",
    artifacts: "Automation rules, integrations, monitoring dashboards",
    timeline: "5-7 days",
    description: "Connect all the pieces with intelligent automation that handles the repetitive work while keeping humans in control.",
    color: "from-secondary to-electric-blue"
  },
  {
    icon: GraduationCap,
    title: "Train",
    goal: "Enable your team",
    artifacts: "Documentation, training materials, ongoing support plan",
    timeline: "2-3 days",
    description: "Comprehensive training and knowledge transfer so your team can confidently operate and extend the new systems.",
    color: "from-purple-500 to-pink-500"
  }
];

export default function ProcessSection() {
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
            Less ceremony, <span className="text-electric-blue">more shipping</span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our proven 5-step process gets you from idea to automated workflows in 30 days or less.
          </motion.p>
        </div>

        <div className="space-y-16 mb-20">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={step.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                data-testid={`process-step-${step.title.toLowerCase()}`}
              >
                {/* Content */}
                <div className={`space-y-6 ${!isEven ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-electric-blue font-medium">Step {index + 1}</div>
                      <h3 className="font-display font-bold text-3xl">{step.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground">{step.description}</p>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Target className="w-5 h-5 text-electric-blue mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Goal</div>
                        <div className="text-sm text-muted-foreground">{step.goal}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <FileText className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Deliverables</div>
                        <div className="text-sm text-muted-foreground">{step.artifacts}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Timeline</div>
                        <div className="text-sm text-muted-foreground">{step.timeline}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual */}
                <div className={!isEven ? 'lg:col-start-1' : ''}>
                  <Card className="glass-card p-8 hover:shadow-2xl transition-all duration-500">
                    <CardContent className="space-y-6">
                      <div className={`aspect-square bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center`}>
                        <Icon className="w-24 h-24 text-white" />
                      </div>
                      <div className="text-center">
                        <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.goal}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline Overview */}
        <div className="text-center mb-12">
          <motion.h3
            className="font-display font-bold text-3xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            30-Day Journey
          </motion.h3>
          <motion.p
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            From discovery to deployment in one month
          </motion.p>
        </div>

        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Timeline Line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-electric-blue via-secondary to-purple-500"></div>

          <div className="grid grid-cols-5 gap-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  className="text-center relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-display font-semibold text-lg mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{step.goal}</p>
                  <div className="text-xs text-electric-blue font-medium">{step.timeline}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
