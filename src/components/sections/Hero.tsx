"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ANIMATION } from "@/lib/constants";

const ease = ANIMATION.easeOut;

const line = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-end overflow-hidden lg:min-h-screen">
      {/* Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80"
          alt="A fine apartment residence at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Readability gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
      </motion.div>

      {/* Content */}
      <div className="container-px relative z-10 w-full pb-16 pt-28 sm:pb-24">
        <motion.p
          {...line(0.2)}
          className="mb-4 text-xs font-semibold uppercase tracking-eyebrow text-white/80"
        >
          Fine Residences Across Tricity
        </motion.p>

        <h1 className="max-w-4xl font-heading text-[36px] font-semibold leading-[1.1] text-white sm:text-5xl lg:text-[64px]">
          <motion.span {...line(0.4)} className="block">
            Find Your Next Chapter,
          </motion.span>
          <motion.span {...line(0.6)} className="block">
            Not Just Your Next Home.
          </motion.span>
        </h1>

        <motion.p
          {...line(0.9)}
          className="mt-6 max-w-[480px] text-base leading-relaxed text-white/85 sm:text-lg"
        >
          Fresh Buy launches and resale flats across Tricity — every one
          walked, measured, and checked against its paperwork before it reaches
          you.
        </motion.p>

        <motion.div {...line(1.1)} className="mt-8">
          <Link
            href="/find"
            className="glass-pill inline-flex min-h-[52px] items-center justify-center rounded-full px-9 font-medium text-white"
          >
            Find Your Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
