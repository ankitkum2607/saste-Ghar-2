"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Scale, X } from "lucide-react";
import { useCompare } from "@/store/useCompare";
import { Button } from "@/components/ui/Button";

/**
 * Floating tray that appears when properties are selected for comparison.
 * Hydration-safe: only renders after mount to avoid an SSR/client mismatch
 * from the persisted store.
 */
export function CompareBar() {
  const { ids, clear } = useCompare();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const count = ids.length;
  const href = `/compare?ids=${ids.join(",")}`;

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex items-center gap-3 rounded-full border border-line bg-white/95 px-4 py-2.5 shadow-lift backdrop-blur sm:gap-4 sm:px-5">
            <span className="flex items-center gap-2 text-sm font-medium text-primary">
              <Scale className="h-4 w-4 text-secondary" />
              <span className="hidden sm:inline">{count} selected to compare</span>
              <span className="sm:hidden">{count} selected</span>
            </span>
            <Button href={href} variant="secondary" size="sm">
              Compare now
            </Button>
            <button
              onClick={clear}
              aria-label="Clear comparison"
              className="grid h-9 w-9 place-items-center rounded-full text-primary-600 hover:bg-cream"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
