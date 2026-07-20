import { getFeatured, getAllProperties } from "@/lib/repo";
import { Hero } from "@/components/sections/Hero";
import { FeaturedGallery } from "@/components/sections/FeaturedGallery";
import { WhySasteGhar } from "@/components/sections/WhySasteGhar";
import { StatsBar } from "@/components/sections/StatsBar";
import { PropertyCollection } from "@/components/sections/PropertyCollection";
import { SellingSection } from "@/components/sections/SellingSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Newsletter } from "@/components/sections/Newsletter";

export default function HomePage() {
  const featured = getFeatured(7);
  const collection = getAllProperties().slice(0, 6);

  return (
    <>
      <Hero />
      <FeaturedGallery properties={featured} />
      <WhySasteGhar />
      <StatsBar />
      <PropertyCollection properties={collection} />
      <SellingSection />
      <Testimonials />
      <FinalCTA />
      <Newsletter />
    </>
  );
}
