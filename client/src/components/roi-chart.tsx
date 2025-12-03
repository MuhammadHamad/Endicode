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
          className="max-w-2xl mx-auto glass-card rounded-2xl p-8 relative overflow-hidden group"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ y: -5 }}
          data-testid="roi-chart"
        >
          {/* Decorative gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 to-electric-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={false}
          />
          
          <div className="space-y-6 relative z-10">
            <motion.div 
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm font-medium text-foreground">Lead Processing</span>
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div 
                    className="w-3 h-3 bg-muted-foreground rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs text-muted-foreground">Before</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div 
                    className="w-3 h-3 bg-electric-blue rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <span className="text-xs text-muted-foreground">After</span>
                </motion.div>
              </div>
            </motion.div>
            
            <div className="space-y-6">
              {chartData.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
                  data-testid={`chart-item-${item.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium w-24">{item.label}</span>
                    <div className="flex-1 bg-muted/50 rounded-full h-10 relative overflow-hidden shadow-inner">
                      <motion.div 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-muted-foreground/60 to-muted-foreground/40 rounded-full shadow-lg"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.before}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.15 }}
                      />
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-electric-blue to-blue-600 rounded-full shadow-lg"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.after}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.8 + index * 0.2, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </div>
                    <motion.span 
                      className="text-sm font-semibold text-foreground w-20 text-right"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 + index * 0.15 }}
                    >
                      {item.beforeValue}
                    </motion.span>
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
