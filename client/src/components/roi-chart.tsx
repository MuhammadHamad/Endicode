import { motion } from "framer-motion";
import Section from "@/components/section";
import Container from "@/components/container";

const chartData = [
  { label: "Manual Steps", before: 85, after: 20, beforeValue: "17 → 3" },
  { label: "Time (hours)", before: 90, after: 15, beforeValue: "8.5 → 1.2" },
  { label: "Errors", before: 70, after: 5, beforeValue: "12 → 1" }
];

export default function ROIChart() {
  return (
    <Section className="border-t border-border/20">
      <Container>
        <div className="text-center mb-12">
          <motion.h2
            className="font-display font-bold text-3xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            See the impact
          </motion.h2>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Before vs After Manual Steps
          </motion.p>
        </div>
        
        <motion.div
          className="max-w-2xl mx-auto glass-card rounded-2xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          data-testid="roi-chart"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-muted-foreground">Lead Processing</span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Before</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-electric-blue rounded-full"></div>
                  <span className="text-xs text-muted-foreground">After</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {chartData.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  data-testid={`chart-item-${item.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-sm w-24">{item.label}</span>
                    <div className="flex-1 bg-muted rounded-full h-8 relative overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 bg-red-500 rounded-full"
                        style={{ width: `${item.before}%` }}
                      />
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-electric-blue rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.after}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-16">{item.beforeValue}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
