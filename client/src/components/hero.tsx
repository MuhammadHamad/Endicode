import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeWindow from "@/components/code-window";
import Container from "@/components/container";
import { CALENDLY_URL, WHATSAPP_URL } from "@/lib/utils";

export default function Hero() {
  const [metrics, setMetrics] = useState({ manual: 0, handoffs: 0, reduction: 0 });

  useEffect(() => {
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
      {/* Soft glows painted as radial gradients (no filter:blur layer — same
          look, no GPU compositing cost). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-1/4 w-[32rem] h-[32rem]"
        style={{ background: "radial-gradient(circle, rgba(0,200,255,0.16) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 left-1/4 w-[28rem] h-[28rem]"
        style={{ background: "radial-gradient(circle, rgba(170,100,255,0.14) 0%, transparent 70%)" }}
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
                Build today.<br />
                <span className="bg-gradient-to-r from-electric-blue via-secondary to-electric-blue bg-clip-text text-transparent">
                  Automate tomorrow.
                </span>
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
              <Button asChild size="lg" className="bg-primary text-primary-foreground">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-whatsapp-contact"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="glass-card">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-book-call"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book a 30-min call
                </a>
              </Button>
            </motion.div>

            {/* ROI Metrics */}
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
                <div
                  key={index}
                  className="text-center glass-card rounded-xl p-4"
                >
                  <div
                    className={`text-3xl font-bold ${metric.color}`}
                    data-testid={metric.testId}
                  >
                    {metric.value}{metric.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual - Code Window (no float) */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <CodeWindow />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
