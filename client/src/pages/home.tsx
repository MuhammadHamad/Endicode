import { motion } from "framer-motion";
import Hero from "@/components/hero";
import LogoMarquee from "@/components/logo-marquee";
import ServicesSection from "@/components/services-section";
import ROIChart from "@/components/roi-chart";
import CaseStudiesSection from "@/components/case-studies-section";
import Testimonials from "@/components/testimonials";
import Container from "@/components/container";
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
      
      {/* Enhanced CTA Section */}
      <section className="py-24 gradient-mesh relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-electric-blue/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <Container>
          <div className="text-center relative z-10">
            <motion.h2
              className="font-display font-bold text-4xl lg:text-5xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              Let's make your ops{' '}
              <motion.span
                className="bg-gradient-to-r from-electric-blue via-secondary to-electric-blue bg-clip-text text-transparent bg-[length:200%_auto] inline-block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                flow
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-xl lg:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              Ready to automate the work and accelerate growth?
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/contact" data-testid="button-get-started">
                  <Button size="lg" className="bg-primary text-primary-foreground min-w-[180px]">
                    Get Started Today
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/demo" data-testid="button-try-demo">
                  <Button size="lg" variant="outline" className="min-w-[180px]">
                    Try Demo
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>
    </motion.div>
  );
}
