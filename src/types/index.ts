export type ListingType = "buy" | "rent";

/** SasteGhar business classification (used for the Fresh Buy / Resale badge). */
export type SaleKind = "fresh-buy" | "resale";

export type PropertyType =
  | "house"
  | "apartment"
  | "villa"
  | "condo"
  | "townhouse"
  | "commercial"
  | "land";

export type PropertyStatus = "available" | "pending" | "sold" | "rented";

export interface Amenities {
  parking: boolean;
  swimmingPool: boolean;
  garden: boolean;
  petFriendly: boolean;
  gym: boolean;
  security: boolean;
  airConditioning: boolean;
  furnished: boolean;
}

export interface FloorPlan {
  name: string;
  area: number;
  image: string;
}

export interface NearbyPlace {
  name: string;
  type: "school" | "hospital" | "shopping" | "transport" | "park";
  distance: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  listingType: ListingType;
  propertyType: PropertyType;
  status: PropertyStatus;
  price: number; // sale price in ₹
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  area: number; // carpet area, sq ft
  yearBuilt: number;
  images: string[];
  tourUrl?: string;
  amenities: Amenities;
  features: string[];
  floorPlans: FloorPlan[];
  nearby: NearbyPlace[];
  featured: boolean;
  createdAt: string;

  // --- SasteGhar-specific fields ---
  kind: SaleKind; // "fresh-buy" | "resale"
  tagline: string;
  locality: string;
  builder: string;
  reraId: string;
  possession: string;
  pricePerSqft: number;
}

export interface PropertyFilters {
  q?: string;
  listingType?: ListingType | "all";
  propertyType?: PropertyType | "all";
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  city?: string;
  parking?: boolean;
  swimmingPool?: boolean;
  garden?: boolean;
  petFriendly?: boolean;
  sort?: "newest" | "price-asc" | "price-desc" | "area-desc";
  page?: number;
  perPage?: number;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}
