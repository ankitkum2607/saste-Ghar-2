"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ANIMATION } from "@/lib/constants";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-[100px] sm:py-[160px]">
      {/* Background with slow zoom */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: ANIMATION.easeOut }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=2000&q=80"
          alt="A city skyline of residential towers at dusk"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
      </motion.div>

      <div className="container-px relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: ANIMATION.easeOut }}
          className="text-xs font-semibold uppercase tracking-eyebrow text-white/70"
        >
          Begin
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.15, ease: ANIMATION.easeOut }}
          className="mx-auto mt-4 max-w-3xl font-heading text-[28px] font-semibold leading-tight text-white sm:text-4xl lg:text-5xl"
        >
          Somewhere in the Tricity, there is a home that fits exactly.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.3, ease: ANIMATION.easeOut }}
          className="mx-auto mt-6 max-w-[560px] text-base leading-relaxed text-white/80"
        >
          Tell us what you need. We will come back with three flats that match —
          and we will tell you honestly if none of them do.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.45, ease: ANIMATION.easeOut }}
          className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/find"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-secondary px-8 font-medium text-white transition-colors hover:bg-secondary-700"
          >
            Find the right property
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/50 px-8 font-medium text-white transition-colors hover:bg-white/10"
          >
            Talk to Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
