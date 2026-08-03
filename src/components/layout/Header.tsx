"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import GlassSurface from "@/components/ui/GlassSurface";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isSellPage = pathname === "/sell";
  const ctaText = isSellPage ? "Sell Your Flat" : "Find the right property";
  const ctaHref = isSellPage ? "/sell" : "/find";

  return (
    <>
      <header
        className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 transition-transform duration-300 translate-y-0"
      >
        {/* One long liquid-glass capsule — the SAME look everywhere and at every
            scroll position (a constant dark-tinted glass so white text stays
            legible over the hero, the dark banners, and the light sections). */}
        <GlassSurface
          width="clamp(320px, 94vw, 1100px)"
          height={64}
          borderRadius={9999}
          className="glass-header max-w-full"
          backgroundOpacity={0.12}
          saturation={1.5}
          displace={2}
          distortionScale={-110}
        >
          {/* Constant dark scrim keeps white text readable on any background */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 to-black/25" />

          <div className="relative flex w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-9">
            <Logo inverse />

            <nav
              className="hidden items-center gap-6 lg:flex"
              aria-label="Primary"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white/90 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href={ctaHref}
                className="inline-flex min-h-[36px] sm:min-h-[40px] items-center justify-center rounded-full bg-secondary px-3.5 sm:px-5 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-secondary-700 shadow-soft"
              >
                {ctaText}
              </Link>

              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="-mr-1 grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </GlassSurface>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

