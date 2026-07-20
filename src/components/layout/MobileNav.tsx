"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Logo } from "./Logo";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-[70] flex w-[86%] max-w-sm flex-col border-l border-white/40 bg-white/70 shadow-lift backdrop-blur-2xl lg:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full text-primary hover:bg-cream"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 py-4">
              <ul>
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex min-h-[56px] items-center rounded-xl px-4 font-heading text-lg text-primary hover:bg-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-line p-5">
              <a
                href={`tel:${SITE.phoneHref}`}
                className="flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-secondary px-5 font-medium text-white"
              >
                <Phone className="h-4 w-4" />
                {SITE.phone}
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
