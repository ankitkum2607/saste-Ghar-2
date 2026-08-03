import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PropertiesClient } from "./PropertiesClient";

export const metadata: Metadata = {
  title: "The Collection — Flats for Sale",
  description:
    "Browse Fresh Buy launches and resale flats across Tricity (Mohali, Chandigarh, Zirakpur, Banur Road, Kharar). Filter by price, city, configuration, and amenities.",
};

export default function PropertiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Collection"
        title="Currently on the market."
        subtitle="Fresh Buy launches and resale flats across Tricity. Use the filters to narrow by price, configuration, city, and amenities — or open the map to browse by location."
        crumbs={[{ label: "Properties" }]}
      />
      <div className="container-px py-12 sm:py-16">
        <Suspense
          fallback={
            <div className="py-20 text-center text-primary-600">Loading…</div>
          }
        >
          <PropertiesClient />
        </Suspense>
      </div>
    </>
  );
}
