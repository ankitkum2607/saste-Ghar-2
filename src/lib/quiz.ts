import type { Property, PropertyType } from "@/types";
import { properties } from "@/lib/data/properties";

export interface QuizOption {
  value: string;
  label: string;
  description?: string;
}

export type QuizStepId = "propertyType" | "subType" | "location" | "timeline" | "buyerType";

export interface QuizStep {
  id: QuizStepId;
  eyebrow: string;
  question: string;
  options: QuizOption[];
}

export type QuizAnswers = Partial<Record<QuizStepId, string>>;

export const QUIZ_STEPS_CONFIG: Record<Exclude<QuizStepId, "subType">, QuizStep> & {
  subType: (answers: QuizAnswers) => QuizStep;
} = {
  propertyType: {
    id: "propertyType" as QuizStepId,
    eyebrow: "Step 1",
    question: "What type of property are you interested in?",
    options: [
      { value: "residential", label: "Residential", description: "Villas, flats, and residential plots" },
      { value: "commercial", label: "Commercial", description: "SCOs, showrooms, and commercial plots" },
    ],
  },
  subType: (answers: QuizAnswers): QuizStep => ({
    id: "subType" as QuizStepId,
    eyebrow: "Step 2",
    question: "Which category fits your requirement?",
    options:
      answers.propertyType === "commercial"
        ? [
            { value: "plot", label: "Plot", description: "Commercial land" },
            { value: "shop_sco", label: "Shop/SCO's", description: "Shop-cum-Offices" },
            { value: "showroom", label: "Showrooms", description: "Premium display spaces" },
          ]
        : [
            { value: "plot", label: "Plot", description: "Residential land" },
            { value: "flat", label: "Flat", description: "Apartments & penthouses" },
            { value: "villa", label: "Villa", description: "Independent houses & villas" },
          ],
  }),
  location: {
    id: "location" as QuizStepId,
    eyebrow: "Step 3",
    question: "Which location do you prefer?",
    options: [
      { value: "Kharar Landran Road", label: "Kharar Landran Road" },
      { value: "Banur Road", label: "Banur Road" },
      { value: "Kurali bypass", label: "Kurali bypass" },
      { value: "New Chandigarh", label: "New Chandigarh" },
      { value: "Mohali Main Sectors", label: "Mohali Main Sectors" },
      { value: "Zirakpur", label: "Zirakpur" },
      { value: "Chandigarh Ambala highway", label: "Chandigarh Ambala highway" },
    ],
  },
  timeline: {
    id: "timeline" as QuizStepId,
    eyebrow: "Step 4",
    question: "What is your preferred possession timeline?",
    options: [
      { value: "ready", label: "Ready to move", description: "Immediate possession" },
      { value: "pre_launch", label: "Pre launch", description: "Under construction / upcoming" },
    ],
  },
  buyerType: {
    id: "buyerType" as QuizStepId,
    eyebrow: "Step 5",
    question: "What is your buying purpose?",
    options: [
      { value: "end_user", label: "End user", description: "Buying to live / occupy" },
      { value: "investor", label: "Investor", description: "Buying for capital gain / rental income" },
    ],
  },
};

/**
 * Returns the next step ID in the branching questionnaire flow based on current answers.
 * Returns null if the flow should end.
 */
export function getNextStepId(currentId: QuizStepId, answers: QuizAnswers): QuizStepId | null {
  if (currentId === "propertyType") {
    return "subType";
  }
  if (currentId === "subType") {
    return "location";
  }
  if (currentId === "location") {
    return "timeline";
  }
  if (currentId === "timeline") {
    return "buyerType";
  }
  return null;
}

/**
 * Gets the list of steps that make up the active path based on current answers.
 */
export function getPathSteps(answers: QuizAnswers): QuizStep[] {
  return [
    QUIZ_STEPS_CONFIG.propertyType,
    QUIZ_STEPS_CONFIG.subType(answers),
    QUIZ_STEPS_CONFIG.location,
    QUIZ_STEPS_CONFIG.timeline,
    QUIZ_STEPS_CONFIG.buyerType,
  ].map((step, idx) => ({
    ...step,
    eyebrow: `Question ${idx + 1} of 5`,
  }));
}

export interface Shortlist {
  matches: Property[];
  exact: boolean;
}

/**
 * Scores every flat against the answers and returns matching properties.
 */
export function shortlistProperties(answers: QuizAnswers): Shortlist {
  const scored = properties.map((p) => {
    let score = 0;
    let matchesCriteria = true;

    // 1. Property Type (Residential vs Commercial)
    if (answers.propertyType) {
      const isCommercial = p.propertyType === "commercial";
      const wantCommercial = answers.propertyType === "commercial";
      if (isCommercial === wantCommercial) {
        score += 10;
      } else {
        matchesCriteria = false;
      }
    }

    // 2. Sub-Type (Plot, Flat, Villa, Shop/SCO's, Showrooms)
    if (answers.subType) {
      if (answers.subType === "flat") {
        if (p.propertyType === "apartment") score += 10;
        else matchesCriteria = false;
      } else if (answers.subType === "villa") {
        if (p.propertyType === "villa") score += 10;
        else matchesCriteria = false;
      } else if (answers.subType === "plot") {
        if (p.propertyType === "land") score += 10;
        else matchesCriteria = false;
      } else if (answers.subType === "shop_sco") {
        if (p.propertyType === "commercial" && p.slug.includes("sco")) score += 10;
        else if (p.propertyType === "commercial") score += 5;
        else matchesCriteria = false;
      } else if (answers.subType === "showroom") {
        if (p.propertyType === "commercial" && p.slug.includes("showroom")) score += 10;
        else if (p.propertyType === "commercial") score += 5;
        else matchesCriteria = false;
      }
    }

    // 3. Location
    if (answers.location) {
      if (p.city.toLowerCase() === answers.location.toLowerCase()) {
        score += 10;
      } else {
        matchesCriteria = false;
      }
    }

    // 4. Timeline
    if (answers.timeline) {
      const isReady = p.possession.toLowerCase().includes("ready");
      const wantReady = answers.timeline === "ready";
      if (isReady === wantReady) {
        score += 10;
      } else {
        score += 2;
      }
    }

    // 5. Buyer type
    if (answers.buyerType) {
      if (answers.buyerType === "investor") {
        const isCommercial = p.propertyType === "commercial";
        const isFresh = p.kind === "fresh-buy";
        if (isCommercial || isFresh) score += 5;
      } else {
        const isReady = p.possession.toLowerCase().includes("ready");
        const isResi = p.propertyType !== "commercial";
        if (isReady && isResi) score += 5;
      }
    }

    return { p, score, matchesCriteria };
  });

  // Filter properties that fit the requirements
  const hard = scored
    .filter((s) => s.matchesCriteria)
    .sort((a, b) => b.score - a.score || a.p.price - b.p.price);

  if (hard.length > 0) {
    return { matches: hard.slice(0, 3).map((s) => s.p), exact: true };
  }

  // Fallback to relaxed scoring if no exact matches
  const relaxed = [...scored]
    .sort((a, b) => b.score - a.score || a.p.price - b.p.price);
  return { matches: relaxed.slice(0, 3).map((s) => s.p), exact: false };
}
