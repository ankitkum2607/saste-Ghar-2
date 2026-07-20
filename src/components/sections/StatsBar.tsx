"use client";

import { motion } from "framer-motion";
import { STATS, ANIMATION } from "@/lib/constants";
import { CountUp } from "@/components/animations/CountUp";

export function StatsBar() {
  return (
    <section className="bg-primary py-16 text-white sm:py-20">
      <div className="container-px">
        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: ANIMATION.staggerMed } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-8 lg:grid-cols-5"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: ANIMATION.standard,
                    ease: ANIMATION.easeOut,
                  },
                },
              }}
              className="text-center lg:text-left"
            >
              <p className="font-heading text-4xl font-bold text-accent sm:text-5xl">
                <CountUp
                  to={s.value}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix}
                />
              </p>
              <p className="mt-2 text-sm leading-snug text-white/70">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
