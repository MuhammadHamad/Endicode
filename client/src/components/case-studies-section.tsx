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
              className="glass-card rounded-2xl p-8 group relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              data-testid={`case-study-${index}`}
            >
              {/* Hover gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-electric-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />
              
              <div className="mb-6 relative z-10">
                <motion.div 
                  className="text-sm text-electric-blue font-medium mb-2 inline-block px-3 py-1 glass-card rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                >
                  {study.category}
                </motion.div>
                <h3 className="font-display font-bold text-xl mb-4 group-hover:text-electric-blue transition-colors">
                  {study.title}
                </h3>
              </div>
              
              <div className="space-y-4 mb-6 relative z-10">
                {[
                  { label: "Problem", content: study.problem },
                  { label: "Solution", content: study.solution },
                  { label: "Result", content: study.result },
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    className="text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + idx * 0.05 }}
                  >
                    <span className="text-muted-foreground font-medium">{item.label}:</span>{" "}
                    <span className="text-foreground/90">{item.content}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center relative z-10">
                {study.metrics.map((metric, metricIndex) => (
                  <motion.div
                    key={metricIndex}
                    className="glass-card rounded-xl p-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + metricIndex * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <motion.div
                      className={`text-3xl font-bold ${metricIndex === 0 ? 'text-secondary' : 'text-electric-blue'}`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + metricIndex * 0.1 + 0.4, type: "spring", stiffness: 200 }}
                    >
                      {metric.value}
                    </motion.div>
                    <div className="text-xs text-muted-foreground mt-1">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
