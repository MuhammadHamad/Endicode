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
              className="glass-card rounded-2xl p-8 group relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -5, scale: 1.02 }}
              data-testid={`testimonial-${index}`}
            >
              {/* Quote decoration */}
              <motion.div
                className="absolute top-4 right-4 text-6xl text-primary/10 font-serif"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                "
              </motion.div>
              
              <div className="flex items-start space-x-4 relative z-10">
                <motion.div
                  className={`w-14 h-14 bg-gradient-to-br ${testimonial.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className={`font-bold text-lg ${testimonial.color.includes('secondary') ? 'text-black' : 'text-white'}`}>
                    {testimonial.initials}
                  </span>
                </motion.div>
                <div className="flex-1">
                  <motion.p
                    className="text-muted-foreground mb-4 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    "{testimonial.content}"
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <div className="font-semibold text-lg">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
