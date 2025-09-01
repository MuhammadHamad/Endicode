import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Container from "@/components/container";
import Section from "@/components/section";
import ContactForm from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MagneticButton from "@/components/magnetic-button";

export default function ContactSection() {
  return (
    <Section className="gradient-mesh">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
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
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Ready to automate the work and accelerate growth?
            </motion.p>
          </div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-card">
              <CardContent className="p-8">
                <ContactForm />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
