import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
};

/**
 * Wraps a page section with a gentle fade/slide-in reveal as it scrolls
 * into view. Used by every section so the site feels alive without being
 * an "attraction" (per the brief: camerale and touching, not flashy).
 */
export default function SectionWrapper({ id, children, className = "" }: Props) {
  return (
    <motion.section
      id={id}
      className={`w-full max-w-3xl mx-auto px-6 py-20 sm:py-24 scroll-mt-20 ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
