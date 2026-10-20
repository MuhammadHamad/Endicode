import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Turn off for a page's hero so its <h1> (often the LCP element) shows on first paint. */
  fadeIn?: boolean;
}

export default function Section({ children, className = "", id, fadeIn = true }: SectionProps) {
  if (!fadeIn) {
    return (
      <section id={id} className={`py-20 ${className}`}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
}
