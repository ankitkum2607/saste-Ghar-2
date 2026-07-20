"use client";

import { motion } from "framer-motion";
import { BENEFITS, ANIMATION } from "@/lib/constants";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ANIMATION.standard, ease: ANIMATION.easeOut },
  },
};

export function WhySasteGhar() {
  return (
    <section className="section-pad">
      <div className="container-px">
        <RevealOnScroll className="max-w-3xl">
          <p className="eyebrow">Why SasteGhar</p>
          <h2 className="mt-4 font-heading text-[28px] font-semibold leading-tight text-primary sm:text-4xl lg:text-[44px]">
            A shortlist you can actually trust.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-primary-600">
            We would rather show you three homes that fit than three hundred that
            might. Here is what that means in practice.
          </p>
        </RevealOnScroll>

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: ANIMATION.staggerMed } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-8 sm:gap-6 lg:grid-cols-3"
        >
          {BENEFITS.map((b) => (
            <motion.div
              key={b.number}
              variants={itemVariants}
              className="rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-cream hover:shadow-soft"
            >
              <span className="font-heading text-5xl font-semibold text-line-strong">
                {b.number}
              </span>
              <h3 className="mt-4 font-heading text-xl font-semibold text-primary">
                {b.title}
              </h3>
              <p className="mt-3 leading-relaxed text-primary-600">{b.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
