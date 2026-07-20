import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CompareClient } from "./CompareClient";

export const metadata: Metadata = {
  title: "Compare Flats",
  description:
    "Compare flats side by side — price, configuration, possession, builder, RERA, and amenities.",
};

export default function ComparePage() {
  return (
    <>
      <PageHeader
        eyebrow="Side by Side"
        title="Compare flats."
        subtitle="See your shortlisted homes next to each other to make the right call."
        crumbs={[{ label: "Properties", href: "/properties" }, { label: "Compare" }]}
      />
      <div className="container-px py-12 sm:py-16">
        <Suspense
          fallback={<p className="text-center text-primary-600">Loading…</p>}
        >
          <CompareClient />
        </Suspense>
      </div>
    </>
  );
}
