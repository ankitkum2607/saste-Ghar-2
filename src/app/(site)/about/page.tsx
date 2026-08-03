import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { HowWeDo } from "@/components/sections/HowWeDo";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About SasteGhar"
        title="A property business built on trust."
        subtitle="We started in one room above a bank in Sector 68, Mohali, convinced the property business was broken in a fixable way. Today, that conviction remains unchanged."
        crumbs={[{ label: "About" }]}
      />
      <WhoWeAre />
      <WhatWeDo />
      <HowWeDo />
    </>
  );
}
