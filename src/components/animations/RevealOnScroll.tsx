"use client";

import { motion } from "framer-motion";
import { ANIMATION } from "@/lib/constants";

/**
 * Pattern 1 — scroll-triggered fade + slide up. Reduced-motion users get a
 * plain opacity fade (framer-motion respects prefers-reduced-motion for
 * transforms when the OS setting is on via the global CSS rule + reduced y).
 */
export function RevealOnScroll({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: ANIMATION.standard, ease: ANIMATION.easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}
