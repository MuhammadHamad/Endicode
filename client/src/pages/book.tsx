import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Clock, Video } from "lucide-react";
import { Link } from "wouter";
import Container from "@/components/container";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Book() {
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
              Connect via <span className="text-electric-blue">WhatsApp</span>
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Let's discuss your project and see how we can help automate your workflows. 
              This is a placeholder page for calendar integration.
            </motion.p>
          </div>
        </Container>
      </Section>

      {/* Booking Section */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Call Options */}
              <motion.div
                className="md:col-span-2 space-y-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-electric-blue" />
                      <span>Discovery Call</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">30 minutes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Video call (Google Meet)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      We'll discuss your current processes, automation opportunities, and how Endicode can help.
                    </p>
                    
                    {/* Placeholder for calendar integration */}
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                      <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Calendar Integration</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        This would integrate with Calendly, Cal.com, or similar booking system
                      </p>
                      <Button className="bg-primary text-primary-foreground" data-testid="button-placeholder-book">
                        Placeholder: Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* What to Expect */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">What to expect</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-medium mb-1">Process Review</div>
                        <div className="text-muted-foreground">We'll map your current workflows and identify automation opportunities</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Technical Discussion</div>
                        <div className="text-muted-foreground">Review your tech stack and integration requirements</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Custom Proposal</div>
                        <div className="text-muted-foreground">Receive a tailored solution with timeline and pricing</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Come prepared with:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Current process pain points</li>
                      <li>• Integration requirements</li>
                      <li>• Team size and structure</li>
                      <li>• Timeline expectations</li>
                      <li>• Budget considerations</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Alternative Contact */}
      <Section className="gradient-mesh">
        <Container>
          <div className="text-center">
            <motion.h2
              className="font-display font-bold text-3xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Prefer to message first?
            </motion.h2>
            <motion.p
              className="text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Send us details about your project and we'll get back to you within 4 hours.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/contact">
                <Button variant="outline" className="glass-card hover:shadow-xl transition-all duration-300" data-testid="button-send-message">
                  Send Message Instead
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
}
