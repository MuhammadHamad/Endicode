import { motion } from "framer-motion";
import Section from "@/components/section";
import Container from "@/components/container";

const testimonials = [
  {
    content: "Endicode didn't just build our platform - they automated our entire lead qualification process. We went from 40% to 85% conversion on qualified leads.",
    author: "John Davis",
    role: "CEO, TechGear Solutions",
    initials: "JD",
    color: "from-electric-blue to-blue-600"
  },
  {
    content: "The automation demo sold us immediately. Within 30 days, our manual data entry dropped from 8 hours to 20 minutes per day.",
    author: "Lisa Martinez", 
    role: "Operations Director, DataFlow Inc",
    initials: "LM",
    color: "from-secondary to-green-500"
  }
];

export default function Testimonials() {
  return (
    <Section className="border-t border-border/20">
      <Container>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              className="glass-card rounded-2xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              data-testid={`testimonial-${index}`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <span className={`font-bold text-lg ${testimonial.color.includes('secondary') ? 'text-black' : 'text-white'}`}>
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <p className="text-muted-foreground mb-4">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
