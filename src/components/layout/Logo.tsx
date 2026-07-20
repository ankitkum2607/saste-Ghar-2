import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  inverse = false,
  className,
}: {
  inverse?: boolean;
  className?: string;
}) {
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
