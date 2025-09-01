import { motion } from "framer-motion";
import Section from "@/components/section";
import Container from "@/components/container";

const caseStudies = [
  {
    category: "E-commerce Platform",
    title: "TechGear reduced support tickets by 78%",
    problem: "Manual order processing and customer inquiries overwhelming support team",
    solution: "AI chatbot for order status + automated fulfillment workflows",
    result: "78% fewer tickets, 3x faster resolution time",
    metrics: [
      { value: "78%", label: "Fewer tickets" },
      { value: "3x", label: "Faster resolution" }
    ]
  },
  {
    category: "SaaS Platform",
    title: "DataFlow automated lead qualification",
    problem: "Sales team spending 60% of time on unqualified leads",
    solution: "AI-powered lead scoring and automated routing system",
    result: "150% increase in qualified opportunities",
    metrics: [
      { value: "150%", label: "More qualified leads" },
      { value: "60%", label: "Time saved" }
    ]
  },
  {
    category: "Healthcare Startup",
    title: "MedConnect streamlined patient onboarding",
    problem: "Complex multi-step patient registration causing 40% drop-off",
    solution: "Progressive web app with smart form automation",
    result: "85% completion rate and 4x faster onboarding",
    metrics: [
      { value: "85%", label: "Completion rate" },
      { value: "4x", label: "Faster onboarding" }
    ]
  }
];

export default function CaseStudiesSection() {
  return (
    <Section id="case-studies" className="gradient-mesh">
      <Container>
        <div className="text-center mb-16">
          <motion.h2
            className="font-display font-bold text-4xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Success Stories
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Real results from real clients
          </motion.p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              className="glass-card rounded-2xl p-8 hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              data-testid={`case-study-${index}`}
            >
              <div className="mb-6">
                <div className="text-sm text-electric-blue font-medium mb-2">{study.category}</div>
                <h3 className="font-display font-bold text-xl mb-4">{study.title}</h3>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="text-sm">
                  <span className="text-muted-foreground">Problem:</span> {study.problem}
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Solution:</span> {study.solution}
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Result:</span> {study.result}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                {study.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex}>
                    <div className={`text-2xl font-bold ${metricIndex === 0 ? 'text-secondary' : 'text-electric-blue'}`}>
                      {metric.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
