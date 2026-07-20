"use client";

import { useState } from "react";
import { Heart, Share2, Printer, Scale, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/store/useWishlist";
import { useCompare } from "@/store/useCompare";

/** Save / compare / share / print actions for a property. */
export function PropertyActions({
  propertyId,
  title,
}: {
  propertyId: string;
  title: string;
}) {
  const wishlisted = useWishlist((s) => s.ids.includes(propertyId));
  const toggleWishlist = useWishlist((s) => s.toggle);
  const inCompare = useCompare((s) => s.ids.includes(propertyId));
  const toggleCompare = useCompare((s) => s.toggle);
  const atLimit = useCompare((s) => s.ids.length >= 3);
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* user cancelled — fall through to copy */
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <ActionBtn
        active={wishlisted}
        onClick={() => toggleWishlist(propertyId)}
        activeClass="border-red-200 bg-red-50 text-red-500"
      >
        <Heart className={cn("h-4 w-4", wishlisted && "fill-current")} />
        {wishlisted ? "Saved" : "Save"}
      </ActionBtn>

      <ActionBtn
        active={inCompare}
        disabled={!inCompare && atLimit}
        onClick={() => toggleCompare(propertyId)}
        activeClass="border-secondary bg-secondary/10 text-secondary"
      >
        <Scale className="h-4 w-4" />
        {inCompare ? "Comparing" : "Compare"}
      </ActionBtn>

      <ActionBtn onClick={share}>
        {copied ? (
          <>
            <Check className="h-4 w-4 text-success" /> Copied
          </>
        ) : (
          <>
            <Share2 className="h-4 w-4" /> Share
          </>
        )}
      </ActionBtn>

      <ActionBtn onClick={() => window.print()}>
        <Printer className="h-4 w-4" /> Print
      </ActionBtn>
    </div>
  );
}

function ActionBtn({
  children,
  onClick,
  active,
  disabled,
  activeClass = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  activeClass?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-cream disabled:opacity-40",
        active && activeClass
      )}
    >
      {children}
    </button>
  );
}
