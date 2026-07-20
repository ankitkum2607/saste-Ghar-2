import type { Paginated, Property } from "@/types";
import { properties } from "@/lib/data/properties";

const PER_PAGE = 6;

/** All listings (newest first). */
export function getAllProperties(): Property[] {
  return [...properties];
}

/** A single property by slug (or id, as a fallback). */
export function getProperty(slugOrId: string): Property | undefined {
  return properties.find((p) => p.slug === slugOrId || p.id === slugOrId);
}

/** Featured listings for the homepage gallery. */
export function getFeatured(limit = 8): Property[] {
  const feat = properties.filter((p) => p.featured);
  return (feat.length ? feat : properties).slice(0, limit);
}

/** Similar listings: same city first, then fill from anywhere. */
export function getSimilar(property: Property, n = 3): Property[] {
  const sameCity = properties.filter(
    (p) => p.id !== property.id && p.city === property.city
  );
  const rest = properties.filter(
    (p) => p.id !== property.id && p.city !== property.city
  );
  return [...sameCity, ...rest].slice(0, n);
}

/**
 * Client-side filter + sort + paginate that mirrors the query contract the
 * listing page relied on from `/api/properties`. Accepts the same
 * URLSearchParams the UI builds, so it is a drop-in replacement for the fetch.
 */
export function filterProperties(sp: URLSearchParams): Paginated<Property> {
  const q = (sp.get("q") || "").trim().toLowerCase();
  const propertyType = sp.get("propertyType") || "";
  const minPrice = num(sp.get("minPrice"));
  const maxPrice = num(sp.get("maxPrice"));
  const bedrooms = num(sp.get("bedrooms"));
  const bathrooms = num(sp.get("bathrooms"));
  const minArea = num(sp.get("minArea"));
  const city = (sp.get("city") || "").trim().toLowerCase();
  const wantParking = sp.get("parking") === "true";
  const wantPool = sp.get("swimmingPool") === "true";
  const wantGarden = sp.get("garden") === "true";
  const wantPet = sp.get("petFriendly") === "true";
  const sort = sp.get("sort") || "newest";
  const page = Math.max(1, num(sp.get("page")) || 1);

  let items = properties.filter((p) => {
    if (q) {
      const hay = `${p.title} ${p.address} ${p.city} ${p.locality} ${p.state} ${p.tagline}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (propertyType && p.propertyType !== propertyType) return false;
    if (minPrice && p.price < minPrice) return false;
    if (maxPrice && p.price > maxPrice) return false;
    if (bedrooms && p.bedrooms < bedrooms) return false;
    if (bathrooms && p.bathrooms < bathrooms) return false;
    if (minArea && p.area < minArea) return false;
    if (city && !`${p.city} ${p.locality}`.toLowerCase().includes(city)) return false;
    if (wantParking && !p.amenities.parking) return false;
    if (wantPool && !p.amenities.swimmingPool) return false;
    if (wantGarden && !p.amenities.garden) return false;
    if (wantPet && !p.amenities.petFriendly) return false;
    return true;
  });

  items = sortProperties(items, sort);

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  const paged = items.slice(start, start + PER_PAGE);

  return { items: paged, total, page, perPage: PER_PAGE, totalPages };
}

function sortProperties(items: Property[], sort: string): Property[] {
  const arr = [...items];
  switch (sort) {
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "area-desc":
      return arr.sort((a, b) => b.area - a.area);
    case "newest":
    default:
      return arr.sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
      );
  }
}

function num(v: string | null): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}
