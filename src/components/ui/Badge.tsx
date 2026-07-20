import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "secondary" | "accent" | "success" | "neutral" | "danger";

const tones: Record<Tone, string> = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/15 text-accent-600",
  success: "bg-success/15 text-success-600",
  neutral: "bg-cream-deep text-primary-600",
  danger: "bg-red-100 text-red-600",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
