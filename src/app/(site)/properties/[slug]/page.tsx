import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Bed,
  Bath,
  Car,
  Maximize,
  MapPin,
  CalendarDays,
  Check,
  ChevronRight,
  Phone,
  Mail,
  School,
  Hospital,
  ShoppingBag,
  TrainFront,
  Trees,
  Navigation,
  ExternalLink,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { getProperty, getSimilar, getAllProperties } from "@/lib/repo";
import {
  formatPrice,
  formatNumber,
  googleMapsUrl,
  gmailComposeUrl,
} from "@/lib/utils";
import { AMENITY_LABELS, SITE } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Gallery } from "@/components/property/Gallery";
import { InquiryForm } from "@/components/property/InquiryForm";
import { PropertyActions } from "@/components/property/PropertyActions";
import { PropertyMap } from "@/components/property/PropertyMap";
import { MortgageCalculator } from "@/components/property/MortgageCalculator";
import { PropertyCard } from "@/components/property/PropertyCard";

export function generateStaticParams() {
  return getAllProperties().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const property = getProperty(params.slug);
  if (!property) return { title: "Property not found" };
  return {
    title: property.title,
    description: property.description.slice(0, 160),
    openGraph: { images: [property.images[0]] },
  };
}

const nearbyIcon = {
  school: School,
  hospital: Hospital,
  shopping: ShoppingBag,
  transport: TrainFront,
  park: Trees,
};

export default function PropertyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const property = getProperty(params.slug);
  if (!property) notFound();

  const similar = getSimilar(property, 3);
  const activeAmenities = Object.entries(property.amenities).filter(([, v]) => v);
  const isFresh = property.kind === "fresh-buy";

  return (
    <div className="pt-24">
      <div className="container-px">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="py-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-primary-600">
            <li>
              <Link href="/" className="hover:text-secondary">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <Link href="/properties" className="hover:text-secondary">
                Properties
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-primary">{property.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge tone="secondary">{isFresh ? "Fresh Buy" : "Resale"}</Badge>
              <Badge tone="accent">{property.possession}</Badge>
              <Badge tone="success">
                {property.bedrooms} BHK · {property.propertyType}
              </Badge>
            </div>
            <h1 className="font-heading text-3xl font-semibold text-primary sm:text-4xl">
              {property.title}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-primary-600">
              <MapPin className="h-4 w-4" />
              {property.address}, {property.locality}, {property.city},{" "}
              {property.state} {property.zip}
            </p>
          </div>
          <div className="min-w-0 text-left lg:shrink-0 lg:text-right">
            <p className="font-heading text-3xl font-bold text-secondary sm:text-4xl">
              {formatPrice(property.price)}
            </p>
            <p className="mt-1 text-sm text-primary-600">
              {formatPrice(property.pricePerSqft)} / sq.ft
            </p>
          </div>
        </div>

        {/* Gallery */}
        <Gallery images={property.images} title={property.title} />

        {/* Actions */}
        <div className="mt-6">
          <PropertyActions propertyId={property.id} title={property.title} />
        </div>
      </div>

      {/* Body */}
      <div className="container-px section-pad grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-12">
          {/* Key stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat icon={Bed} label="Bedrooms" value={property.bedrooms} />
            <Stat icon={Bath} label="Bathrooms" value={property.bathrooms} />
            <Stat icon={Car} label="Parking" value={property.garage} />
            <Stat
              icon={Maximize}
              label="Carpet Area"
              value={`${formatNumber(property.area)} sq.ft`}
            />
          </div>

          {/* SasteGhar facts */}
          <div className="grid gap-4 rounded-2xl border border-line bg-cream p-5 sm:grid-cols-3">
            <Fact icon={Building2} label="Builder" value={property.builder} />
            <Fact icon={CalendarDays} label="Possession" value={property.possession} />
            <Fact icon={ShieldCheck} label="RERA ID" value={property.reraId} />
          </div>

          {/* Overview */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-semibold text-primary">
              Overview
            </h2>
            <p className="whitespace-pre-line leading-relaxed text-primary-600">
              {property.description}
            </p>
          </section>

          {/* Features */}
          {property.features.length > 0 && (
            <section>
              <h2 className="mb-4 font-heading text-2xl font-semibold text-primary">
                Features
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {property.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-primary-600"
                  >
                    <Check className="h-4 w-4 shrink-0 text-success" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Amenities */}
          {activeAmenities.length > 0 && (
            <section>
              <h2 className="mb-4 font-heading text-2xl font-semibold text-primary">
                Amenities
              </h2>
              <div className="flex flex-wrap gap-2">
                {activeAmenities.map(([key]) => (
                  <span
                    key={key}
                    className="rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary"
                  >
                    {AMENITY_LABELS[key] || key}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Floor plans */}
          {property.floorPlans.length > 0 && (
            <section>
              <h2 className="mb-4 font-heading text-2xl font-semibold text-primary">
                Floor Plans
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {property.floorPlans.map((fp) => (
                  <div key={fp.name} className="card-surface overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={fp.image}
                        alt={fp.name}
                        fill
                        sizes="50vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <span className="font-medium text-primary">{fp.name}</span>
                      <span className="text-sm text-primary-600">
                        {formatNumber(fp.area)} sq.ft
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Location + nearby — MAP AT THE END */}
          <section>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-heading text-2xl font-semibold text-primary">
                Location & Nearby
              </h2>
              <a
                href={googleMapsUrl(property.lat, property.lng)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-cream"
              >
                <Navigation className="h-4 w-4 text-secondary" />
                Open in Google Maps
                <ExternalLink className="h-3.5 w-3.5 text-primary-600" />
              </a>
            </div>
            <p className="mb-4 flex items-center gap-1.5 text-sm text-primary-600">
              <MapPin className="h-4 w-4 shrink-0" />
              {property.locality}, {property.city}, {property.state} {property.zip}
            </p>
            <PropertyMap
              properties={[property]}
              height="360px"
              zoom={13}
              center={[property.lat, property.lng]}
            />
            {property.nearby.length > 0 && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {property.nearby.map((n) => {
                  const Icon = nearbyIcon[n.type];
                  return (
                    <div
                      key={n.name}
                      className="flex items-center gap-3 rounded-xl border border-line p-3"
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary/10 text-secondary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-primary">
                          {n.name}
                        </p>
                        <p className="text-xs text-primary-600">{n.distance}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* EMI / mortgage */}
          <section>
            <h2 className="mb-4 font-heading text-2xl font-semibold text-primary">
              Estimate Your Payment
            </h2>
            <MortgageCalculator defaultPrice={property.price} compact />
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="card-surface p-6 lg:sticky lg:top-24">
            <p className="font-heading text-lg font-semibold text-primary">
              {SITE.name}
            </p>
            <p className="mt-1 text-sm text-primary-600">
              Speak to us about this property.
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href={`tel:${SITE.phoneHref}`}
                className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-full border border-line-strong py-2 text-sm text-primary hover:bg-cream"
              >
                <Phone className="h-3.5 w-3.5" /> Call
              </a>
              <a
                href={gmailComposeUrl(
                  SITE.email,
                  `Enquiry: ${property.title}`,
                  `Hi ${SITE.name},\n\nI'm interested in "${property.title}" (${property.locality}, ${property.city}). Please share more details.\n\nThanks,`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-full border border-line-strong py-2 text-sm text-primary hover:bg-cream"
              >
                <Mail className="h-3.5 w-3.5" /> Email
              </a>
            </div>

            <div className="mt-6 border-t border-line pt-6">
              <h3 className="mb-4 font-heading font-semibold text-primary">
                Request Information
              </h3>
              <InquiryForm
                propertyId={property.id}
                propertyTitle={property.title}
              />
            </div>
          </div>
        </aside>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="section-pad bg-cream">
          <div className="container-px">
            <h2 className="mb-8 font-heading text-2xl font-semibold text-primary">
              Similar Properties
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
}) {
  return (
    <div className="card-surface flex items-center gap-3 p-4">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary/10 text-secondary">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs text-primary-600">{label}</p>
        <p className="font-heading font-semibold text-primary">{value}</p>
      </div>
    </div>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-secondary">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-eyebrow text-primary-600">
          {label}
        </p>
        <p className="break-all text-sm font-medium text-primary">{value}</p>
      </div>
    </div>
  );
}
