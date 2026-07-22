"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Brand logo. The file lives at `public/logo.png`.
 *
 * The logo is full-colour with dark text, which would be invisible on the dark
 * glass header and dark footer. On those surfaces (`inverse`) we sit it on a
 * small white chip so the original colours stay legible; on light surfaces
 * (the mobile drawer) it renders bare. Falls back to the text wordmark if the
 * image ever fails to load.
 */
const LOGO_SRC = "/logo.png";

export function Logo({
  inverse = false,
  className,
}: {
  inverse?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <Link
        href="/"
        aria-label="SasteGhar — home"
        className={cn("group inline-flex flex-col leading-none", className)}
      >
        <span
          className={cn(
            "font-heading text-xl font-semibold tracking-tight sm:text-2xl",
            inverse ? "text-white" : "text-primary"
          )}
        >
          SasteGhar
        </span>
        <span
          className={cn(
            "mt-0.5 text-[10px] font-medium uppercase tracking-[0.15em]",
            inverse ? "text-white/60" : "text-primary-600"
          )}
        >
          Fine Residences
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label="SasteGhar — home"
      className={cn(
        "group inline-flex items-center",
        inverse && "rounded-lg bg-white px-3 py-1.5",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_SRC}
        alt="SasteGhar"
        onError={() => setFailed(true)}
        className="h-9 w-auto max-w-[200px] object-contain sm:h-10"
      />
    </Link>
  );
}
