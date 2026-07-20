"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useCompare } from "@/store/useCompare";

/** Subtle bottom-fixed CTA on mobile for high-intent browsing. */
export function StickyMobileCTA() {
  const pathname = usePathname();
  const comparing = useCompare((s) => s.ids.length > 0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don't cover the listing/detail pages' own actions, or the compare tray.
  if (pathname.startsWith("/properties") || comparing) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 backdrop-blur lg:hidden"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
          <Link
            href="/find"
            className="glass-pill-accent flex min-h-[48px] items-center justify-center gap-2 rounded-full font-medium text-white"
          >
            <Search className="h-4 w-4" />
            Find Your Home
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
