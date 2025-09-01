import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Clock, DollarSign } from "lucide-react";
import { Link } from "wouter";
import Container from "@/components/container";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MagneticButton from "@/components/magnetic-button";

const caseStudies = [
  {
    id: 1,
    category: "E-commerce Platform",
    title: "TechGear reduced support tickets by 78%",
    client: "TechGear Solutions",
    industry: "E-commerce",
    duration: "8 weeks",
    investment: "$45K",
    challenge: "Manual order processing and customer inquiries were overwhelming the support team. Average response time was 24+ hours, leading to customer frustration and lost sales.",
    solution: "We built an AI-powered chatbot integrated with their order management system, plus automated fulfillment workflows that handled 80% of common inquiries without human intervention.",
    results: [
      { metric: "78%", description: "Reduction in support tickets" },
      { metric: "3x", description: "Faster response times" },
      { metric: "$120K", description: "Annual cost savings" }
    ],
    technologies: ["Next.js", "OpenAI", "Shopify API", "Webhook automation"],
    testimonial: {
      quote: "FoundryFlow didn't just solve our immediate problem—they gave us a competitive advantage.",
      author: "John Davis, CEO"
    }
  },
  {
    id: 2,
    category: "SaaS Platform", 
    title: "DataFlow automated lead qualification",
    client: "DataFlow Inc",
    industry: "B2B SaaS",
    duration: "6 weeks",
    investment: "$35K",
    challenge: "Sales team was spending 60% of their time on unqualified leads, missing high-value opportunities and burning out from low-quality prospects.",
    solution: "AI-powered lead scoring system with automated routing, email sequences, and CRM integration that prioritizes prospects based on buying signals and company data.",
    results: [
      { metric: "150%", description: "Increase in qualified opportunities" },
      { metric: "60%", description: "Time saved per sales rep" },
      { metric: "2.8x", description: "Higher conversion rate" }
    ],
    technologies: ["React", "Python", "HubSpot API", "Machine Learning"],
    testimonial: {
      quote: "Our sales team now focuses on closing deals instead of chasing dead ends.",
      author: "Lisa Martinez, VP Sales"
    }
  },
  {
    id: 3,
    category: "Healthcare Startup",
    title: "MedConnect streamlined patient onboarding",
    client: "MedConnect Health",
    industry: "Healthcare",
    duration: "10 weeks", 
    investment: "$65K",
    challenge: "Complex multi-step patient registration process was causing 40% drop-off rate, delaying care and frustrating both patients and staff.",
    solution: "Progressive web app with intelligent form completion, document automation, and real-time verification that guides patients through onboarding seamlessly.",
    results: [
      { metric: "85%", description: "Completion rate improvement" },
      { metric: "4x", description: "Faster onboarding process" },
      { metric: "95%", description: "Patient satisfaction score" }
    ],
    technologies: ["React Native", "FHIR", "Smart contracts", "Document AI"],
    testimonial: {
      quote: "Patient onboarding went from our biggest pain point to a competitive advantage.",
      author: "Dr. Sarah Kim, Founder"
    }
  }
];

export default function CaseStudies() {
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
            <motion.h1
              className="font-display font-bold text-5xl lg:text-6xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Success <span className="text-electric-blue">Stories</span>
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Real results from real clients. See how we've helped businesses automate workflows and accelerate growth.
            </motion.p>
          </div>
        </Container>
      </Section>

      {/* Case Studies */}
      <Section>
        <Container>
          <div className="space-y-20">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                className="grid lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                {/* Overview */}
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <Badge variant="outline" className="mb-4">{study.category}</Badge>
                    <h2 className="font-display font-bold text-3xl mb-4">{study.title}</h2>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-electric-blue" />
                        <span className="text-sm text-muted-foreground">{study.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-secondary" />
                        <span className="text-sm text-muted-foreground">{study.investment}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-electric-blue" />
                        <span className="text-sm text-muted-foreground">{study.industry}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-red-400">The Challenge</h3>
                      <p className="text-muted-foreground">{study.challenge}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-electric-blue">Our Solution</h3>
                      <p className="text-muted-foreground">{study.solution}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-4 text-secondary">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech) => (
                          <span 
                            key={tech}
                            className="px-3 py-1 bg-muted rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results & Testimonial */}
                <div className="space-y-6">
                  {/* Results Card */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {study.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="text-center">
                          <div className={`text-2xl font-bold ${resultIndex === 0 ? 'text-secondary' : resultIndex === 1 ? 'text-electric-blue' : 'text-purple-400'}`}>
                            {result.metric}
                          </div>
                          <div className="text-xs text-muted-foreground">{result.description}</div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Testimonial Card */}
                  <Card className="glass-card">
                    <CardContent className="p-6">
                      <blockquote className="text-sm text-muted-foreground mb-4">
                        "{study.testimonial.quote}"
                      </blockquote>
                      <div className="text-sm font-medium">{study.testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">{study.client}</div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="gradient-mesh">
        <Container>
          <div className="text-center">
            <motion.h2
              className="font-display font-bold text-4xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready for your success story?
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Let's discuss how we can help you achieve similar results.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MagneticButton asChild>
                <Link href="/contact">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:shadow-xl transition-all duration-300">
                    Start Your Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </MagneticButton>
              <MagneticButton asChild>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="glass-card hover:shadow-xl transition-all duration-300">
                    See Demo
                  </Button>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
}
