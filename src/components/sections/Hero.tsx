"use client";

import { useState, useEffect } from "react";
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

// Premium Indian property and interior images on Unsplash
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1549499090-c9203d2b20ad?auto=format&fit=crop&w=2400&q=85", // Modern luxury white highrise facade
  "https://images.unsplash.com/photo-1745429523615-2a82c60bfc02?auto=format&fit=crop&w=2400&q=85", // Spacious modern Indian flat living room
  "https://images.unsplash.com/photo-1632400990400-416d5460f337?auto=format&fit=crop&w=2400&q=85", // Premium flat/villa entrance and landscaping
  "https://images.unsplash.com/photo-1650877489685-b7d8b1160b6f?auto=format&fit=crop&w=2400&q=85", // Tall residential tower rising against the sky
  "https://images.unsplash.com/photo-1674821770946-4f774b1907d7?auto=format&fit=crop&w=2400&q=85", // Dusk skyline of modern residential complexes
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500); // Transitions every 4.5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-[90vh] items-end overflow-hidden lg:min-h-screen">
      {/* Background Slideshow */}
      <div className="absolute inset-0 overflow-hidden bg-black">
        <div
          className="absolute inset-0 flex"
          style={{
            width: `${HERO_IMAGES.length * 100}%`,
            transform: `translateX(-${currentIndex * (100 / HERO_IMAGES.length)}%)`,
            transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {HERO_IMAGES.map((src, index) => (
            <div
              key={src}
              className="relative h-full w-full"
              style={{ width: `${100 / HERO_IMAGES.length}%` }}
            >
              <Image
                src={src}
                alt="Premium property feature"
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {/* Readability gradient */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
      </div>

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
            Find the right property
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
