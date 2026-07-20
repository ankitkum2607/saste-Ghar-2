"use client";

import dynamic from "next/dynamic";
import type { Property } from "@/types";
import { Skeleton } from "@/components/ui/Skeleton";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => <Skeleton className="h-[360px] w-full rounded-2xl" />,
});

interface PropertyMapProps {
  properties: Property[];
  height?: string;
  zoom?: number;
  center?: [number, number];
}

/** SSR-safe map wrapper. Import THIS anywhere a map is needed. */
export function PropertyMap(props: PropertyMapProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line shadow-soft">
      <MapView {...props} />
    </div>
  );
}
