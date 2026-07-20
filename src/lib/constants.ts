import type { PropertyType } from "@/types";

export const SITE = {
  name: "SasteGhar",
  shortName: "SasteGhar",
  descriptor: "Fine Residences",
  tagline: "Find Your Next Chapter, Not Just Your Next Home.",
  description:
    "Fresh Buy launches and resale flats across twelve Indian cities — every one walked, measured, and checked against its paperwork before it reaches you.",
  url: "https://sasteghar.in",
  phone: "+91 124 486 2200",
  phoneHref: "+911244862200",
  whatsapp: "911244862200",
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
    title: "We have walked every flat",
    body: "Nothing reaches this site unseen. We measure it, photograph it, and check it against its paperwork before you ever hear about it.",
  },
  {
    number: "02",
    title: "We read the RERA filing",
    body: "Every project on this site has had its registration, title, and approvals checked by our team. If something does not add up, it does not get listed.",
  },
  {
    number: "03",
    title: "We tell you when it is overpriced",
    body: "Even when it costs us the sale. A shortlist you can trust is worth more than a catalogue you cannot.",
  },
];

/** Section 6 — Stats bar (count-up). */
export const STATS = [
  { value: 72, suffix: "%", label: "Of buyers shortlist within one visit" },
  { value: 4200, suffix: "+", label: "Flats handed over" },
  { value: 8400, prefix: "₹", suffix: " Cr", label: "Property transacted" },
  { value: 96, suffix: "%", label: "Of asking achieved" },
  { value: 12, suffix: "", label: "Cities across India" },
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

/** Footer offices. */
export const OFFICES = [
  {
    city: "Gurugram",
    label: "Head Office",
    address: "Level 12, The Presidium, Golf Course Road, Sector 54, Gurugram 122002",
    phone: "+91 124 486 2200",
    phoneHref: "+911244862200",
  },
  {
    city: "Mumbai",
    label: "West India",
    address: "8th Floor, Quay House, Bandra Kurla Complex, Mumbai 400051",
    phone: "+91 22 6820 1400",
    phoneHref: "+912268201400",
  },
  {
    city: "Bengaluru",
    label: "South India",
    address: "The Exchange, 4th Floor, Whitefield Main Road, Bengaluru 560066",
    phone: "+91 80 4713 9800",
    phoneHref: "+918047139800",
  },
];
