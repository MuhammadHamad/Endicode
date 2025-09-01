import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { Link } from "wouter";
import Container from "@/components/container";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import AutomationDemo from "@/components/automation-demo";
import MagneticButton from "@/components/magnetic-button";

export default function Demo() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <Section className="gradient-mesh">
        <Container>
          <div className="text-center mb-16">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" data-testid="link-back-home">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>
            
            <motion.h1
              className="font-display font-bold text-5xl lg:text-6xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-electric-blue">Automation</span> Demo
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              See the kind of intelligent workflows we build. Try our lead triage classifier and CSV lead scorer to experience automation in action.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button 
                onClick={() => setIsDemoOpen(true)}
                size="lg"
                className="bg-primary text-primary-foreground hover:shadow-xl transition-all duration-300"
                data-testid="button-launch-demo"
              >
                <Play className="w-5 h-5 mr-2" />
                Launch Demo
              </Button>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Demo Features */}
      <Section>
        <Container>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-electric-blue to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl mb-4">Lead Triage Classifier</h2>
                <p className="text-muted-foreground mb-6">
                  Paste any sales inquiry and watch our AI analyze intent, urgency, and complexity - then generate a personalized response draft.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Classifies intent (website, automation, AI assistant, etc.)</li>
                  <li>• Detects urgency indicators</li>
                  <li>• Scores complexity based on requirements</li>
                  <li>• Generates custom pricing recommendations</li>
                  <li>• Creates professional reply templates</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-green-500 rounded-xl flex items-center justify-center">
                <span className="text-black font-bold text-lg">B</span>
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl mb-4">CSV Lead Scorer</h2>
                <p className="text-muted-foreground mb-6">
                  Upload a CSV of leads and get instant scoring based on automation keywords, tools mentioned, and message quality.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Analyzes message content for buying signals</li>
                  <li>• Scores based on tool integrations mentioned</li>
                  <li>• Segments leads into Hot, Warm, and Cold</li>
                  <li>• Deduplicates by email automatically</li>
                  <li>• Exports scored results as new CSV</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* How It Works */}
      <Section className="gradient-mesh">
        <Container>
          <div className="text-center mb-16">
            <motion.h2
              className="font-display font-bold text-4xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              How it works
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Real automation running in your browser - no servers, no signup required
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 h-12 bg-electric-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Input Data</h3>
              <p className="text-sm text-muted-foreground">
                Paste text or upload CSV files with your lead data
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-electric-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">AI Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Our algorithms analyze patterns, keywords, and context
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Actionable Output</h3>
              <p className="text-sm text-muted-foreground">
                Get scored results, recommendations, and ready-to-use content
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section>
        <Container>
          <div className="text-center">
            <motion.h2
              className="font-display font-bold text-4xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to automate your workflows?
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              This demo is just a taste. Let's build something custom for your business.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MagneticButton asChild>
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:shadow-xl transition-all duration-300">
                  <Link href="/contact">
                    Start Your Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </MagneticButton>
              <Button 
                onClick={() => setIsDemoOpen(true)}
                size="lg"
                variant="outline"
                className="glass-card hover:shadow-xl transition-all duration-300"
                data-testid="button-try-demo-again"
              >
                <Play className="w-4 h-4 mr-2" />
                Try Demo
              </Button>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Automation Demo Component */}
      <AutomationDemo isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </motion.div>
  );
}
