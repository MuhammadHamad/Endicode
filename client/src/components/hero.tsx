import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import CodeWindow from "@/components/code-window";
import Container from "@/components/container";
import MagneticButton from "@/components/magnetic-button";

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
      {/* Animated Background Orb */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-electric-blue/20 to-secondary/20 rounded-full blur-3xl animate-float" />
      
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <motion.h1
                className="font-display font-bold text-5xl lg:text-7xl leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                data-testid="hero-title"
              >
                Build today.<br/>
                <span className="bg-gradient-to-r from-electric-blue to-secondary bg-clip-text text-transparent">
                  Automate tomorrow.
                </span>
              </motion.h1>
              <motion.p
                className="text-xl text-muted-foreground leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                data-testid="hero-subtitle"
              >
                We craft conversion-ready web apps - and wire in automation that cuts cost, clicks, and chaos.
              </motion.p>
            </div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <MagneticButton asChild>
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:shadow-xl transition-all duration-300">
                  <a href="https://wa.me/923339535430?text=Hi%20Endicode%2C%20I%27m%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20my%20project." target="_blank" rel="noopener noreferrer" data-testid="button-whatsapp-contact">
                    Chat on WhatsApp
                  </a>
                </Button>
              </MagneticButton>

            </motion.div>
            
            {/* ROI Metrics */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              data-testid="roi-metrics"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-electric-blue" data-testid="metric-manual">
                  {metrics.manual}%
                </div>
                <div className="text-sm text-muted-foreground">fewer manual steps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary" data-testid="metric-handoffs">
                  {metrics.handoffs}x
                </div>
                <div className="text-sm text-muted-foreground">faster handoffs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-electric-blue" data-testid="metric-reduction">
                  {metrics.reduction}%
                </div>
                <div className="text-sm text-muted-foreground">cost reduction</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Hero Visual - Code Window */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <CodeWindow />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
