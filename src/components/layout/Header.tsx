"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import GlassSurface from "@/components/ui/GlassSurface";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // Hide on scroll down (past the header), show on scroll up.
      if (y > lastY && y > 140) setHidden(true);
      else setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-3 z-50 flex justify-center px-4 transition-transform duration-300",
          hidden && !menuOpen ? "-translate-y-[160%]" : "translate-y-0"
        )}
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

          <div className="relative flex w-full items-center justify-between gap-6 px-6 sm:px-9 lg:justify-center lg:gap-16">
            <Logo inverse />

            <nav
              className="hidden items-center gap-9 lg:flex"
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

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="-mr-1 grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </GlassSurface>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
