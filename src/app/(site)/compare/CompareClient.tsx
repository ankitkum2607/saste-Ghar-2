"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { X, Check, Minus } from "lucide-react";
import type { Property } from "@/types";
import { formatPrice, formatNumber } from "@/lib/utils";
import { AMENITY_LABELS } from "@/lib/constants";
import { getProperty } from "@/lib/repo";
import { useCompare } from "@/store/useCompare";
import { Button } from "@/components/ui/Button";

export function CompareClient() {
  const searchParams = useSearchParams();
  const { ids: storeIds, remove } = useCompare();

  const idsParam = searchParams.get("ids");
  const ids = idsParam ? idsParam.split(",").filter(Boolean) : storeIds;

  const items = ids
    .map((id) => getProperty(id))
    .filter((p): p is Property => Boolean(p));

  if (items.length === 0) {
    return (
      <div className="card-surface flex flex-col items-center py-20 text-center">
        <h2 className="font-heading text-xl font-semibold text-primary">
          Nothing to compare yet
        </h2>
        <p className="mt-2 max-w-sm text-sm text-primary-600">
          Add up to 3 flats using the compare (scale) button on any listing, then
          return here to see them side by side.
        </p>
        <Button href="/properties" className="mt-6">
          Browse properties
        </Button>
      </div>
    );
  }

  const rows: { label: string; render: (p: Property) => React.ReactNode }[] = [
    { label: "Price", render: (p) => formatPrice(p.price) },
    { label: "Price / sq.ft", render: (p) => formatPrice(p.pricePerSqft) },
    {
      label: "Listing",
      render: (p) => (p.kind === "fresh-buy" ? "Fresh Buy" : "Resale"),
    },
    { label: "Location", render: (p) => `${p.locality}, ${p.city}` },
    { label: "Bedrooms", render: (p) => p.bedrooms },
    { label: "Bathrooms", render: (p) => p.bathrooms },
    { label: "Parking", render: (p) => p.garage },
    { label: "Carpet Area", render: (p) => `${formatNumber(p.area)} sq.ft` },
    { label: "Possession", render: (p) => p.possession },
    { label: "Builder", render: (p) => p.builder },
    {
      label: "RERA ID",
      render: (p) => <span className="break-all text-xs">{p.reraId}</span>,
    },
  ];

  const amenityKeys = Object.keys(AMENITY_LABELS);

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr>
            <th className="w-40 p-4 text-left align-bottom" />
            {items.map((p) => (
              <th key={p.id} className="p-4 align-bottom">
                <div className="card-surface relative overflow-hidden">
                  <button
                    onClick={() => remove(p.id)}
                    aria-label={`Remove ${p.title}`}
                    className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-primary-600 hover:bg-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="relative h-32">
                    <Image
                      src={p.images[0]}
                      alt={p.title}
                      fill
                      sizes="240px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 text-left">
                    <Link
                      href={`/properties/${p.slug}`}
                      className="line-clamp-1 font-heading text-sm font-semibold text-primary hover:text-secondary"
                    >
                      {p.title}
                    </Link>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 ? "bg-cream" : ""}>
              <td className="p-4 text-sm font-semibold text-primary">
                {row.label}
              </td>
              {items.map((p) => (
                <td
                  key={p.id}
                  className="p-4 text-center text-sm text-primary-600"
                >
                  {row.render(p)}
                </td>
              ))}
            </tr>
          ))}
          {amenityKeys.map((key, i) => (
            <tr key={key} className={(rows.length + i) % 2 ? "bg-cream" : ""}>
              <td className="p-4 text-sm font-semibold text-primary">
                {AMENITY_LABELS[key]}
              </td>
              {items.map((p) => (
                <td key={p.id} className="p-4 text-center">
                  {(p.amenities as unknown as Record<string, boolean>)[key] ? (
                    <Check className="mx-auto h-4 w-4 text-success" />
                  ) : (
                    <Minus className="mx-auto h-4 w-4 text-line-strong" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
