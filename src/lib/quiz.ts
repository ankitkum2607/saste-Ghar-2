import type { Property } from "@/types";
import { properties } from "@/lib/data/properties";

export interface QuizOption {
  value: string;
  label: string;
  description?: string;
}

export interface QuizStep {
  id: "city" | "budget" | "beds" | "timeline";
  eyebrow: string;
  question: string;
  options: QuizOption[];
}

/** Cities that actually have inventory, derived from the mock data. */
const CITIES = Array.from(new Set(properties.map((p) => p.city))).sort();

export const QUIZ_STEPS: QuizStep[] = [
  {
    id: "city",
    eyebrow: "Question 1 of 4",
    question: "Which city are you looking in?",
    options: [
      { value: "any", label: "Open to any city", description: "Show me the best fit anywhere" },
      ...CITIES.map((c) => ({ value: c, label: c })),
    ],
  },
  {
    id: "budget",
    eyebrow: "Question 2 of 4",
    question: "What's your budget?",
    options: [
      { value: "u1", label: "Under ₹1 Cr", description: "Entry and starter flats" },
      { value: "1-2", label: "₹1 – 2 Cr", description: "Mid-range residences" },
      { value: "2-4", label: "₹2 – 4 Cr", description: "Premium homes" },
      { value: "4+", label: "₹4 Cr and above", description: "The top of the collection" },
    ],
  },
  {
    id: "beds",
    eyebrow: "Question 3 of 4",
    question: "How much space does your family need?",
    options: [
      { value: "2", label: "2 BHK", description: "A couple or a small family" },
      { value: "3", label: "3 BHK", description: "A growing family" },
      { value: "4", label: "4 BHK", description: "Room for everyone" },
    ],
  },
  {
    id: "timeline",
    eyebrow: "Question 4 of 4",
    question: "When do you want to move in?",
    options: [
      { value: "ready", label: "Ready to move", description: "I want the keys soon" },
      { value: "soon", label: "Within a year", description: "I can wait a little" },
      { value: "later", label: "Planning ahead", description: "A fresh launch is fine" },
    ],
  },
];

export type QuizAnswers = Partial<Record<QuizStep["id"], string>>;

const BUDGET: Record<string, [number, number]> = {
  u1: [0, 10_000_000],
  "1-2": [10_000_000, 20_000_000],
  "2-4": [20_000_000, 40_000_000],
  "4+": [40_000_000, Number.POSITIVE_INFINITY],
};

export interface Shortlist {
  matches: Property[];
  /** true when the matches genuinely satisfy city + budget + size. */
  exact: boolean;
}

/**
 * Score every flat against the answers and return up to three. If at least one
 * flat truly fits (right city, within budget, enough bedrooms) we return those;
 * otherwise we relax and return the closest three, flagged so the UI can be
 * honest that nothing fit exactly.
 */
export function shortlistProperties(answers: QuizAnswers): Shortlist {
  const need = answers.beds ? Number(answers.beds) : 0;
  const [minP, maxP] = answers.budget ? BUDGET[answers.budget] : [0, Infinity];
  const city = answers.city && answers.city !== "any" ? answers.city : null;

  const scored = properties.map((p) => {
    let score = 0;

    // City
    if (!city) score += 1;
    else if (p.city === city) score += 3;

    // Budget
    if (p.price >= minP && p.price <= maxP) score += 3;
    else if (p.price <= maxP * 1.1) score += 1;

    // Bedrooms
    if (need) {
      if (p.bedrooms === need) score += 3;
      else if (p.bedrooms >= need) score += 1;
    } else {
      score += 1;
    }

    // Timeline
    const ready = p.possession.toLowerCase().includes("ready");
    if (answers.timeline === "ready") score += ready ? 3 : 0;
    else if (answers.timeline === "soon") score += ready || p.kind === "fresh-buy" ? 2 : 0;
    else if (answers.timeline === "later") score += p.kind === "fresh-buy" ? 3 : 1;
    else score += 1;

    return { p, score };
  });

  const fits = (p: Property) =>
    (!city || p.city === city) &&
    p.price <= maxP * 1.05 &&
    (!need || p.bedrooms >= need);

  const hard = scored
    .filter((s) => fits(s.p))
    .sort((a, b) => b.score - a.score || a.p.price - b.p.price);

  if (hard.length > 0) {
    return { matches: hard.slice(0, 3).map((s) => s.p), exact: true };
  }

  const relaxed = [...scored].sort(
    (a, b) => b.score - a.score || a.p.price - b.p.price
  );
  return { matches: relaxed.slice(0, 3).map((s) => s.p), exact: false };
}
