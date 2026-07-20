"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { cn } from "@/lib/utils";

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const go = (n: number) => setActive((n + images.length) % images.length);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-4 sm:grid-rows-2">
        {/* Main image */}
        <div className="relative sm:col-span-3 sm:row-span-2">
          <div className="relative h-72 overflow-hidden rounded-2xl sm:h-full">
            <Image
              src={images[active]}
              alt={`${title} — photo ${active + 1}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover"
            />
            <button
              onClick={() => setLightbox(true)}
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-primary-950/70 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-primary-950"
            >
              <Expand className="h-4 w-4" /> View all
            </button>
            <button
              onClick={() => go(active - 1)}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-primary hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(active + 1)}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-primary hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        {images.slice(0, 4).map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "relative hidden h-full min-h-[90px] overflow-hidden rounded-xl sm:block",
              active === i && "ring-2 ring-secondary ring-offset-2"
            )}
          >
            <Image
              src={src}
              alt={`${title} thumbnail ${i + 1}`}
              fill
              sizes="20vw"
              className="object-cover transition-transform hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(false)}
          >
            <button
              className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={() => setLightbox(false)}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(active - 1);
              }}
              className="absolute left-6 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div
              className="relative h-[80vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[active]}
                alt={`${title} — photo ${active + 1}`}
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(active + 1);
              }}
              className="absolute right-6 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
