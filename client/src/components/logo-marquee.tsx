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
    <section className="py-16 border-t border-border/20 relative overflow-hidden" data-testid="logo-marquee">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.p 
          className="text-center text-muted-foreground mb-10 text-sm uppercase tracking-wider font-medium"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Trusted by forward-thinking companies
        </motion.p>
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {companies.map((company, index) => (
            <motion.div
              key={company}
              className="text-base sm:text-lg font-semibold glass-card px-6 py-3 rounded-lg"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.1, y: -3 }}
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
