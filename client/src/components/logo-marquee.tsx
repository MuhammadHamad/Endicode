import { motion } from "framer-motion";

const companies = [
  "TechCorp",
  "InnovateLab", 
  "DataStream",
  "CloudPeak",
  "AutoFlow",
  "DevStudio"
];

export default function LogoMarquee() {
  return (
    <section className="py-12 border-t border-border/20" data-testid="logo-marquee">
      <div className="container mx-auto px-4">
        <p className="text-center text-muted-foreground mb-8">
          Trusted by forward-thinking companies
        </p>
        <motion.div 
          className="flex items-center justify-center space-x-12 opacity-60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {companies.map((company, index) => (
            <motion.div
              key={company}
              className="text-lg font-semibold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              data-testid={`logo-${company.toLowerCase()}`}
            >
              {company}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
