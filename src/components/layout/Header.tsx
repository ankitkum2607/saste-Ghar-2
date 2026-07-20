"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import GlassSurface from "@/components/ui/GlassSurface";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Hide on scroll down (past the header), show on scroll up.
      if (y > lastY && y > 120) setHidden(true);
      else setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // White text over the hero at the top of home; dark once scrolled onto content.
  const inverse = isHome && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-3 z-50 flex justify-center px-4 transition-transform duration-300",
          hidden && !menuOpen ? "-translate-y-[140%]" : "translate-y-0"
        )}
      >
        <GlassSurface
          width="fit-content"
          height={64}
          borderRadius={9999}
          className="glass-header max-w-full"
          backgroundOpacity={inverse ? 0.12 : 0.72}
          saturation={1.4}
        >
          {/* Contrast scrim so white text stays legible over bright sky */}
          {inverse && (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
          )}

          <div className="relative flex items-center gap-5 px-5 sm:gap-8 sm:px-7">
            <Logo inverse={inverse} />

            <nav
              className="hidden items-center gap-7 lg:flex"
              aria-label="Primary"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    inverse
                      ? "text-white/90 hover:text-white"
                      : "text-primary hover:text-secondary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={cn(
                "-mr-1.5 grid h-10 w-10 place-items-center rounded-full lg:hidden",
                inverse
                  ? "text-white hover:bg-white/10"
                  : "text-primary hover:bg-cream"
              )}
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
