"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TESTIMONIALS, ANIMATION } from "@/lib/constants";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ANIMATION.standard, ease: ANIMATION.easeOut },
  },
};

export function Testimonials() {
  return (
    <section className="bg-cream section-pad">
      <div className="container-px">
        <RevealOnScroll className="max-w-2xl">
          <p className="eyebrow">In Their Words</p>
          <h2 className="mt-4 font-heading text-[28px] font-semibold leading-tight text-primary sm:text-4xl lg:text-[44px]">
            Four thousand families. A few of them.
          </h2>
        </RevealOnScroll>

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: ANIMATION.staggerMed } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid gap-6 md:grid-cols-2"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.name}
              variants={itemVariants}
              className="rounded-2xl border border-line bg-white p-8 sm:p-10"
            >
              <span
                aria-hidden
                className="block font-heading text-5xl leading-none text-line-strong"
              >
                &ldquo;
              </span>
              <blockquote className="mt-2 font-heading text-lg leading-relaxed text-primary sm:text-xl">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-6">
                <Image
                  src={t.photo}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-primary">{t.name}</p>
                  <p className="text-sm text-primary-600">{t.detail}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
