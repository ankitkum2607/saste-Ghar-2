"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Property } from "@/types";
import { ANIMATION } from "@/lib/constants";
import { PropertyCard } from "@/components/property/PropertyCard";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ANIMATION.standard, ease: ANIMATION.easeOut },
  },
};

export function PropertyCollection({ properties }: { properties: Property[] }) {
  return (
    <section className="bg-cream section-pad">
      <div className="container-px">
        <RevealOnScroll className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow">The Collection</p>
            <h2 className="mt-4 font-heading text-[28px] font-semibold leading-tight text-primary sm:text-4xl lg:text-[44px]">
              Currently on the market.
            </h2>
          </div>
          <Link
            href="/properties"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-secondary"
          >
            All Properties
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </RevealOnScroll>

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: ANIMATION.staggerFast } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {properties.map((p) => (
            <motion.div key={p.id} variants={itemVariants}>
              <PropertyCard property={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
