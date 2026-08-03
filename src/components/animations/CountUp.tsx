"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useTransform,
  animate,
  motion,
} from "framer-motion";

/** Count-up animation for stats. Triggers once when scrolled into view. */
export function CountUp({
  to,
  from = 0,
  duration = 1.5,
  prefix = "",
  suffix = "",
}: {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (v) => {
    if (to % 1 !== 0) {
      return v.toFixed(1);
    }
    return Math.round(v).toLocaleString("en-IN");
  });
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [inView, count, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
