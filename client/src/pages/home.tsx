import { motion } from "framer-motion";
import Hero from "@/components/hero";
import LogoMarquee from "@/components/logo-marquee";
import ServicesSection from "@/components/services-section";
import ROIChart from "@/components/roi-chart";
import CaseStudiesSection from "@/components/case-studies-section";
import Testimonials from "@/components/testimonials";
import Container from "@/components/container";
import MagneticButton from "@/components/magnetic-button";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <LogoMarquee />
      <ServicesSection />
      <ROIChart />
      <CaseStudiesSection />
      <Testimonials />
      
      {/* CTA Section */}
      <section className="py-20 gradient-mesh">
        <Container>
          <div className="text-center">
            <motion.h2
              className="font-display font-bold text-4xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Let's make your ops flow
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Ready to automate the work and accelerate growth?
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MagneticButton asChild>
                <Link href="/contact" data-testid="button-get-started">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:shadow-xl transition-all duration-300">
                    Get Started Today
                  </Button>
                </Link>
              </MagneticButton>
              <MagneticButton asChild>
                <Link href="/demo" data-testid="button-try-demo">
                  <Button size="lg" variant="outline" className="glass-card hover:shadow-xl transition-all duration-300">
                    Try Demo
                  </Button>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </Container>
      </section>
    </motion.div>
  );
}
