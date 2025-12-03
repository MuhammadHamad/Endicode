import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import CodeWindow from "@/components/code-window";
import Container from "@/components/container";

export default function Hero() {
  const [metrics, setMetrics] = useState({ manual: 0, handoffs: 0, reduction: 0 });

  useEffect(() => {
    // Animate counter numbers
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    
    const targets = { manual: 42, handoffs: 3.4, reduction: 89 };
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setMetrics({
        manual: Math.floor(targets.manual * progress),
        handoffs: +(targets.handoffs * progress).toFixed(1),
        reduction: Math.floor(targets.reduction * progress),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setMetrics(targets);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center gradient-mesh grain overflow-hidden">
      {/* Enhanced Animated Background Orbs */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-electric-blue/25 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-primary/10 to-electric-blue/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />
      
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="space-y-6">
              <motion.h1
                className="font-display font-bold text-5xl lg:text-7xl leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                data-testid="hero-title"
              >
                Build today.<br/>
                <motion.span 
                  className="bg-gradient-to-r from-electric-blue via-secondary to-electric-blue bg-clip-text text-transparent bg-[length:200%_auto]"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  Automate tomorrow.
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-xl text-muted-foreground leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                data-testid="hero-subtitle"
              >
                We craft conversion-ready web apps - and wire in automation that cuts cost, clicks, and chaos.
              </motion.p>
            </div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button asChild size="lg" className="bg-primary text-primary-foreground">
                  <a href="https://wa.me/923339535430?text=Hi%20Endicode%2C%20I%27m%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20my%20project." target="_blank" rel="noopener noreferrer" data-testid="button-whatsapp-contact">
                    Chat on WhatsApp
                  </a>
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Enhanced ROI Metrics */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
              data-testid="roi-metrics"
            >
              {[
                { value: metrics.manual, suffix: '%', label: 'fewer manual steps', color: 'text-electric-blue', testId: 'metric-manual' },
                { value: metrics.handoffs, suffix: 'x', label: 'faster handoffs', color: 'text-secondary', testId: 'metric-handoffs' },
                { value: metrics.reduction, suffix: '%', label: 'cost reduction', color: 'text-electric-blue', testId: 'metric-reduction' },
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  className="text-center glass-card rounded-xl p-4 hover:scale-105 transition-transform duration-300"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div 
                    className={`text-3xl font-bold ${metric.color}`}
                    data-testid={metric.testId}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 0.8 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    {metric.value}{metric.suffix}
                  </motion.div>
                  <div className="text-sm text-muted-foreground mt-1">{metric.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Hero Visual - Code Window */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <CodeWindow />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
