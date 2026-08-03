import type { PropertyType } from "@/types";

export const SITE = {
  name: "SasteGhar",
  shortName: "SasteGhar",
  descriptor: "Fine Residences",
  tagline: "Find Your Next Chapter, Not Just Your Next Home.",
  description:
    "Fresh Buy launches and resale flats across twelve Indian cities — every one walked, measured, and checked against its paperwork before it reaches you.",
  url: "https://sasteghar.in",
  phone: "081980 31117",
  phoneHref: "+918198031117",
  whatsapp: "918198031117",
  email: "hello@sasteghar.in",
  socials: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  },
} as const;

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "apartment", label: "Apartment" },
  { value: "condo", label: "Condominium" },
  { value: "villa", label: "Villa" },
  { value: "house", label: "House" },
  { value: "townhouse", label: "Townhouse" },
];

export const AMENITY_LABELS: Record<string, string> = {
  parking: "Covered Parking",
  swimmingPool: "Swimming Pool",
  garden: "Landscaped Garden",
  petFriendly: "Pet Friendly",
  gym: "Fitness Studio",
  security: "24×7 Security",
  airConditioning: "Air Conditioning",
  furnished: "Furnished",
};

/**
 * Animation system (from the brief). Durations in ms; easing is the custom
 * smooth ease-out used across scroll reveals.
 */
export const ANIMATION = {
  fast: 0.3,
  standard: 0.6,
  slow: 0.9,
  easeOut: [0.16, 1, 0.3, 1] as const,
  staggerFast: 0.06,
  staggerMed: 0.1,
  staggerSlow: 0.2,
};

/** Section 5 — Why SasteGhar (verbatim copy). */
export const BENEFITS = [
  {
    number: "01",
    title: "Safety & Security",
    body: "Every property goes through our rigorous 18-point checklist. Backed by a dedicated legal and technical team to verify all approvals.",
  },
  {
    number: "02",
    title: "Selective Builders",
    body: "We work exclusively with selective builders and pre-screened projects to save your time, money, and energy.",
  },
  {
    number: "03",
    title: "67% Referral Business",
    body: "Our advisory house has been built on trust since 2011, with more than two-thirds of our business coming from repeat clients.",
  },
];

/** Section 6 — Stats bar (count-up). */
export const STATS: { value: number; prefix?: string; suffix: string; label: string }[] = [
  { value: 50, suffix: "+", label: "Trained professionals (200+ hours training)" },
  { value: 2000, suffix: "+", label: "Happy clients served since 2011" },
  { value: 500, suffix: "+", label: "Active real-estate investors" },
  { value: 67, suffix: "%", label: "Referral & repeat business rate" },
  { value: 4.7, suffix: "", label: "Google rating (250+ reviews)" },
];

/** Section 8 — Selling mini-stats. */
export const SELL_STATS = [
  { value: "7 wks", label: "Median time to close" },
  { value: "₹0", label: "Listing fee" },
  { value: "96%", label: "Of asking achieved" },
  { value: "100%", label: "Buyers pre-checked" },
];

/** Section 9 — Testimonials (verbatim). */
export const TESTIMONIALS = [
  {
    quote:
      "We had seen eleven flats in three weeks and were ready to give up. SasteGhar looked at our shortlist, told us honestly that none of them worked for a family with two young kids, and showed us one that did. We moved in four months later.",
    name: "Ritu & Pranav Bansal",
    detail: "Bought a 4 BHK in Gurugram",
    photo: "https://i.pravatar.cc/96?img=32",
  },
  {
    quote:
      "I sold through them six years after buying. They already had the floor plan and the paperwork from the original sale on file, so there was nothing to reconstruct. It closed in five weeks.",
    name: "Kabir Raina",
    detail: "Sold a 3 BHK in Powai",
    photo: "https://i.pravatar.cc/96?img=12",
  },
  {
    quote:
      "I was buying from Singapore and could not visit. They walked me through the flat on video three separate times, including once in the rain because I asked what the drainage was like. That is not something you get everywhere.",
    name: "Anjali Krishnan",
    detail: "Bought a 3 BHK in Bengaluru",
    photo: "https://i.pravatar.cc/96?img=45",
  },
  {
    quote:
      "No pressure, no daily calls, no invented urgency. They sent me three flats that actually matched my brief and told me the fourth one I had asked about was overpriced. I bought the second.",
    name: "Farhan Ali",
    detail: "Bought a 2 BHK in Pune",
    photo: "https://i.pravatar.cc/96?img=59",
  },
];

/** Office — single location. */
export const OFFICES = [
  {
    city: "Mohali",
    label: "Head Office",
    address:
      "SCO 5-6, Level II, near Waycup Cafe, Sector 68, Sahibzada Ajit Singh Nagar, Punjab 160062",
    phone: "081980 31117",
    phoneHref: "+918198031117",
  },
];
