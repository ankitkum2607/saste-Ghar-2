"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Property } from "@/types";
import { formatPriceCompact, cn } from "@/lib/utils";
import { ANIMATION } from "@/lib/constants";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ANIMATION.standard, ease: ANIMATION.easeOut },
  },
};

export function FeaturedGallery({ properties }: { properties: Property[] }) {
  return (
    <section className="section-pad">
      <div className="container-px">
        <RevealOnScroll className="max-w-3xl">
          <p className="eyebrow">Featured Residences</p>
          <h2 className="mt-4 font-heading text-[28px] font-semibold leading-tight text-primary sm:text-4xl lg:text-[44px]">
            Homes we would live in ourselves.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-primary-600">
            A short list, kept short on purpose. Every residence here has been
            walked, measured, and checked against its paperwork before it reached
            this page.
          </p>
        </RevealOnScroll>

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: ANIMATION.staggerFast } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4"
        >
          {properties.map((p, i) => (
            <motion.div
              key={p.id}
              variants={itemVariants}
              className={cn(
                i === 0 && "col-span-2 lg:col-span-2 lg:row-span-2"
              )}
            >
              <GalleryItem property={p} featured={i === 0} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/properties"
            className="group inline-flex min-h-[48px] items-center gap-2 rounded-full border border-line-strong px-7 font-medium text-primary transition-colors hover:bg-cream"
          >
            View All Properties
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function GalleryItem({
  property,
  featured,
}: {
  property: Property;
  featured: boolean;
}) {
  const isFresh = property.kind === "fresh-buy";
  return (
    <Link
      href={`/properties/${property.slug}`}
      className={cn(
        "group relative block h-full overflow-hidden rounded",
        featured ? "aspect-[16/10] lg:aspect-auto lg:h-full" : "aspect-square"
      )}
    >
      <Image
        src={property.images[0]}
        alt={property.title}
        fill
        sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 50vw, 25vw"}
        className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-105 group-hover:brightness-105"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent [background-position:0_40%]" />

      {/* Badge */}
      <span className="absolute left-3 top-3 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-md">
        {isFresh ? "Fresh Buy" : "Resale"}
      </span>

      {/* Text overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h3
          className={cn(
            "font-heading font-semibold text-white",
            featured ? "text-lg sm:text-2xl" : "text-base sm:text-lg"
          )}
        >
          {property.title}
        </h3>
        <p className="mt-0.5 text-[13px] text-white/80">
          {property.locality}, {property.city}
        </p>
        <span className="mt-1 inline-block text-sm font-medium text-white">
          {formatPriceCompact(property.price)}
        </span>
      </div>
    </Link>
  );
}
