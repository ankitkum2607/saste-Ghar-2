"use client";

import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Maximize, MapPin, Heart, Scale } from "lucide-react";
import { motion } from "framer-motion";
import type { Property } from "@/types";
import { cn, formatPriceCompact } from "@/lib/utils";
import { useWishlist } from "@/store/useWishlist";
import { useCompare } from "@/store/useCompare";

export function PropertyCard({ property }: { property: Property }) {
  const wishlisted = useWishlist((s) => s.ids.includes(property.id));
  const toggleWishlist = useWishlist((s) => s.toggle);
  const inCompare = useCompare((s) => s.ids.includes(property.id));
  const toggleCompare = useCompare((s) => s.toggle);
  const atLimit = useCompare((s) => s.ids.length >= 3);

  const isFresh = property.kind === "fresh-buy";

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group card-surface overflow-hidden transition-shadow duration-300 hover:shadow-lift"
    >
      <div className="relative">
        <Link href={`/properties/${property.slug}`} className="block">
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/50 via-transparent to-transparent opacity-70" />
          </div>
        </Link>

        {/* Fresh Buy / Resale badge */}
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-secondary shadow-soft">
            {isFresh ? "Fresh Buy" : "Resale"}
          </span>
        </div>

        {/* Action buttons */}
        <div className="absolute right-4 top-4 flex gap-2">
          <button
            type="button"
            onClick={() => toggleWishlist(property.id)}
            aria-label={wishlisted ? "Remove from saved" : "Save property"}
            aria-pressed={wishlisted}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-primary shadow-soft transition-colors hover:bg-white"
          >
            <Heart
              className={cn("h-4 w-4", wishlisted && "fill-red-500 text-red-500")}
            />
          </button>
          <button
            type="button"
            onClick={() => toggleCompare(property.id)}
            disabled={!inCompare && atLimit}
            aria-label={inCompare ? "Remove from compare" : "Add to compare"}
            aria-pressed={inCompare}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-soft transition-colors hover:bg-white disabled:opacity-40",
              inCompare ? "text-secondary" : "text-primary"
            )}
          >
            <Scale className="h-4 w-4" />
          </button>
        </div>

        {/* Price */}
        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-primary-950/80 px-4 py-1.5 font-heading text-lg font-semibold text-white backdrop-blur-sm">
            {formatPriceCompact(property.price)}
          </span>
        </div>
      </div>

      <div className="p-5">
        <Link href={`/properties/${property.slug}`}>
          <h3 className="line-clamp-1 font-heading text-lg font-semibold text-primary transition-colors group-hover:text-secondary">
            {property.title}
          </h3>
        </Link>
        <p className="mt-1 flex items-center gap-1 text-sm text-primary-600">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-1">
            {property.locality}, {property.city}
          </span>
        </p>

        <div className="mt-4 flex items-center gap-4 border-t border-line pt-4 text-sm text-primary-600">
          <span className="flex items-center gap-1.5" title="Bedrooms">
            <Bed className="h-4 w-4 text-secondary" /> {property.bedrooms}
          </span>
          <span className="flex items-center gap-1.5" title="Bathrooms">
            <Bath className="h-4 w-4 text-secondary" /> {property.bathrooms}
          </span>
          <span className="ml-auto flex items-center gap-1.5" title="Area">
            <Maximize className="h-4 w-4 text-secondary" />
            {property.area.toLocaleString("en-IN")} sq.ft
          </span>
        </div>
      </div>
    </motion.article>
  );
}
