"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  X,
  LayoutGrid,
  Map as MapIcon,
  Mic,
} from "lucide-react";
import type { Paginated, Property } from "@/types";
import { PROPERTY_TYPES } from "@/lib/constants";
import { filterProperties } from "@/lib/repo";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyMap } from "@/components/property/PropertyMap";
import { PropertyCardSkeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { useRecentSearches } from "@/store/useRecentSearches";
import { cn } from "@/lib/utils";

const AMENITIES = [
  { key: "parking", label: "Covered Parking" },
  { key: "swimmingPool", label: "Swimming Pool" },
  { key: "garden", label: "Garden" },
  { key: "petFriendly", label: "Pet Friendly" },
] as const;

interface SpeechRec {
  lang: string;
  interimResults: boolean;
  onresult: (e: { results: { transcript: string }[][] }) => void;
  onend: () => void;
  onerror: () => void;
  start: () => void;
}

type Draft = {
  q: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  minArea: string;
  city: string;
  parking: boolean;
  swimmingPool: boolean;
  garden: boolean;
  petFriendly: boolean;
  sort: string;
};

function draftFromParams(sp: URLSearchParams): Draft {
  return {
    q: sp.get("q") || "",
    propertyType: sp.get("propertyType") || "",
    minPrice: sp.get("minPrice") || "",
    maxPrice: sp.get("maxPrice") || "",
    bedrooms: sp.get("bedrooms") || "",
    bathrooms: sp.get("bathrooms") || "",
    minArea: sp.get("minArea") || "",
    city: sp.get("city") || "",
    parking: sp.get("parking") === "true",
    swimmingPool: sp.get("swimmingPool") === "true",
    garden: sp.get("garden") === "true",
    petFriendly: sp.get("petFriendly") === "true",
    sort: sp.get("sort") || "newest",
  };
}

export function PropertiesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addRecent = useRecentSearches((s) => s.add);

  const [draft, setDraft] = useState<Draft>(() =>
    draftFromParams(new URLSearchParams(searchParams.toString()))
  );
  const [data, setData] = useState<Paginated<Property> | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"grid" | "map">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [listening, setListening] = useState(false);

  const page = Number(searchParams.get("page") || 1);

  // Sync draft when the URL changes (e.g. from nav links).
  useEffect(() => {
    setDraft(draftFromParams(new URLSearchParams(searchParams.toString())));
  }, [searchParams]);

  // Compute results locally whenever the URL query changes (mock data).
  useEffect(() => {
    setLoading(true);
    const qs = searchParams.toString();
    const res = filterProperties(new URLSearchParams(qs));
    // Small delay keeps the skeleton from flashing jarringly.
    const t = setTimeout(() => {
      setData(res);
      setLoading(false);
    }, 150);
    return () => clearTimeout(t);
  }, [searchParams]);

  const buildQuery = useCallback(
    (over: Partial<Draft> & { page?: number }) => {
      const next = { ...draft, ...over };
      const params = new URLSearchParams();
      if (next.q) params.set("q", next.q);
      if (next.propertyType) params.set("propertyType", next.propertyType);
      if (next.minPrice) params.set("minPrice", next.minPrice);
      if (next.maxPrice) params.set("maxPrice", next.maxPrice);
      if (next.bedrooms) params.set("bedrooms", next.bedrooms);
      if (next.bathrooms) params.set("bathrooms", next.bathrooms);
      if (next.minArea) params.set("minArea", next.minArea);
      if (next.city) params.set("city", next.city);
      if (next.parking) params.set("parking", "true");
      if (next.swimmingPool) params.set("swimmingPool", "true");
      if (next.garden) params.set("garden", "true");
      if (next.petFriendly) params.set("petFriendly", "true");
      if (next.sort && next.sort !== "newest") params.set("sort", next.sort);
      const p = (over as { page?: number }).page ?? 1;
      if (p > 1) params.set("page", String(p));
      return params.toString();
    },
    [draft]
  );

  const apply = useCallback(
    (over: Partial<Draft> & { page?: number } = {}) => {
      const qs = buildQuery(over);
      if (draft.q) addRecent(draft.q);
      router.push(`/properties${qs ? `?${qs}` : ""}`);
      setShowFilters(false);
    },
    [buildQuery, router, draft.q, addRecent]
  );

  const reset = useCallback(() => {
    setDraft(draftFromParams(new URLSearchParams()));
    router.push("/properties");
  }, [router]);

  // Voice search (Web Speech API, progressive enhancement)
  const startVoice = useCallback(() => {
    const SR =
      (window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown })
        .webkitSpeechRecognition;
    if (!SR) {
      alert("Voice search isn't supported in this browser.");
      return;
    }
    const rec = new (SR as { new (): SpeechRec })();
    rec.lang = "en-IN";
    rec.interimResults = false;
    setListening(true);
    rec.onresult = (e: { results: { transcript: string }[][] }) => {
      const text = e.results[0][0].transcript;
      setDraft((d) => ({ ...d, q: text }));
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    rec.start();
  }, []);

  const activeFilterCount = useMemo(() => {
    let n = 0;
    if (draft.propertyType) n++;
    if (draft.minPrice || draft.maxPrice) n++;
    if (draft.bedrooms) n++;
    if (draft.bathrooms) n++;
    if (draft.minArea) n++;
    if (draft.city) n++;
    AMENITIES.forEach((a) => draft[a.key] && n++);
    return n;
  }, [draft]);

  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
      {/* Filters sidebar */}
      <aside
        className={cn(
          "lg:block",
          showFilters
            ? "fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4 lg:static lg:z-auto lg:bg-transparent lg:p-0"
            : "hidden"
        )}
        onClick={(e) => e.target === e.currentTarget && setShowFilters(false)}
      >
        <div className="card-surface h-fit space-y-6 p-6 lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-primary">
              Filters
            </h2>
            <div className="flex items-center gap-2">
              {activeFilterCount > 0 && (
                <button
                  onClick={reset}
                  className="text-xs font-semibold text-secondary hover:underline"
                >
                  Clear all
                </button>
              )}
              <button
                className="lg:hidden"
                onClick={() => setShowFilters(false)}
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Property type */}
          <FilterGroup label="Property Type">
            <select
              value={draft.propertyType}
              onChange={(e) =>
                setDraft((d) => ({ ...d, propertyType: e.target.value }))
              }
              className="h-11 w-full rounded-xl border border-line-strong bg-white px-3 text-sm"
            >
              <option value="">Any type</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </FilterGroup>

          {/* Price */}
          <FilterGroup label="Price Range (₹)">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                placeholder="Min"
                value={draft.minPrice}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, minPrice: e.target.value }))
                }
                className="h-11 w-full rounded-xl border border-line-strong bg-white px-3 text-sm"
              />
              <span className="text-primary-600">–</span>
              <input
                type="number"
                min={0}
                placeholder="Max"
                value={draft.maxPrice}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, maxPrice: e.target.value }))
                }
                className="h-11 w-full rounded-xl border border-line-strong bg-white px-3 text-sm"
              />
            </div>
          </FilterGroup>

          {/* Beds / Baths */}
          <div className="grid grid-cols-2 gap-4">
            <FilterGroup label="Beds">
              <select
                value={draft.bedrooms}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, bedrooms: e.target.value }))
                }
                className="h-11 w-full rounded-xl border border-line-strong bg-white px-3 text-sm"
              >
                <option value="">Any</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}+
                  </option>
                ))}
              </select>
            </FilterGroup>
            <FilterGroup label="Baths">
              <select
                value={draft.bathrooms}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, bathrooms: e.target.value }))
                }
                className="h-11 w-full rounded-xl border border-line-strong bg-white px-3 text-sm"
              >
                <option value="">Any</option>
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n}+
                  </option>
                ))}
              </select>
            </FilterGroup>
          </div>

          {/* Area + City */}
          <FilterGroup label="Min Area (sq.ft)">
            <input
              type="number"
              min={0}
              placeholder="e.g. 1000"
              value={draft.minArea}
              onChange={(e) => setDraft((d) => ({ ...d, minArea: e.target.value }))}
              className="h-11 w-full rounded-xl border border-line-strong bg-white px-3 text-sm"
            />
          </FilterGroup>

          <FilterGroup label="City">
            <input
              type="text"
              placeholder="e.g. Mohali"
              value={draft.city}
              onChange={(e) => setDraft((d) => ({ ...d, city: e.target.value }))}
              className="h-11 w-full rounded-xl border border-line-strong bg-white px-3 text-sm"
            />
          </FilterGroup>

          {/* Amenities */}
          <FilterGroup label="Amenities">
            <div className="space-y-2">
              {AMENITIES.map((a) => (
                <label
                  key={a.key}
                  className="flex cursor-pointer items-center gap-2.5 text-sm text-primary-600"
                >
                  <input
                    type="checkbox"
                    checked={draft[a.key]}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, [a.key]: e.target.checked }))
                    }
                    className="h-4 w-4 rounded border-line-strong text-secondary focus:ring-secondary"
                  />
                  {a.label}
                </label>
              ))}
            </div>
          </FilterGroup>

          <Button onClick={() => apply()} className="w-full">
            Apply Filters
          </Button>
        </div>
      </aside>

      {/* Results */}
      <div>
        {/* Search + toolbar */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-600" />
              <input
                value={draft.q}
                onChange={(e) => setDraft((d) => ({ ...d, q: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && apply()}
                placeholder="Search by city, locality, or keyword…"
                aria-label="Search properties"
                className="h-12 w-full rounded-xl border border-line-strong bg-white pl-11 pr-24 text-sm"
              />
              <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-1">
                <button
                  onClick={startVoice}
                  aria-label="Voice search"
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-lg text-primary-600 hover:bg-cream",
                    listening && "animate-pulse text-secondary"
                  )}
                >
                  <Mic className="h-4 w-4" />
                </button>
                <button
                  onClick={() => apply()}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-secondary text-white"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowFilters(true)}
              className="relative inline-flex h-12 items-center gap-2 rounded-xl border border-line-strong px-4 text-sm font-semibold text-primary lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="grid h-5 w-5 place-items-center rounded-full bg-secondary text-[10px] text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-primary-600">
              {loading ? (
                "Searching…"
              ) : (
                <>
                  <span className="font-semibold text-primary">{total}</span>{" "}
                  {total === 1 ? "property" : "properties"} found
                </>
              )}
            </p>
            <div className="flex items-center gap-3">
              <select
                value={draft.sort}
                onChange={(e) => {
                  const v = e.target.value;
                  setDraft((d) => ({ ...d, sort: v }));
                  apply({ sort: v });
                }}
                className="h-10 rounded-xl border border-line-strong bg-white px-3 text-sm"
                aria-label="Sort by"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-desc">Largest Area</option>
              </select>
              <div className="flex rounded-xl border border-line-strong p-1">
                <button
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-lg",
                    view === "grid" ? "bg-secondary text-white" : "text-primary-600"
                  )}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView("map")}
                  aria-label="Map view"
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-lg",
                    view === "map" ? "bg-secondary text-white" : "text-primary-600"
                  )}
                >
                  <MapIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid / Map */}
        {view === "map" ? (
          <PropertyMap properties={data?.items ?? []} height="640px" zoom={5} />
        ) : loading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : total === 0 ? (
          <div className="card-surface flex flex-col items-center justify-center py-20 text-center">
            <Search className="h-10 w-10 text-line-strong" />
            <h3 className="mt-4 font-heading text-lg font-semibold text-primary">
              No properties match your search
            </h3>
            <p className="mt-1 max-w-sm text-sm text-primary-600">
              Try widening your price range or clearing some filters.
            </p>
            <Button onClick={reset} variant="outline" className="mt-5">
              Clear filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {data!.items.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                className="mt-10 flex items-center justify-center gap-2"
                aria-label="Pagination"
              >
                <button
                  disabled={page <= 1}
                  onClick={() => apply({ page: page - 1 })}
                  className="rounded-lg border border-line-strong px-4 py-2 text-sm font-medium disabled:opacity-40"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => apply({ page: i + 1 })}
                    className={cn(
                      "h-10 w-10 rounded-lg text-sm font-semibold",
                      page === i + 1
                        ? "bg-secondary text-white"
                        : "border border-line-strong"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={page >= totalPages}
                  onClick={() => apply({ page: page + 1 })}
                  className="rounded-lg border border-line-strong px-4 py-2 text-sm font-medium disabled:opacity-40"
                >
                  Next
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-primary">{label}</span>
      {children}
    </div>
  );
}
