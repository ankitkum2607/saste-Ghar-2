"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  LayoutGrid,
  MapPin,
  CalendarClock,
  UserCheck,
  Check,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";
import {
  shortlistProperties,
  getNextStepId,
  getPathSteps,
  QUIZ_STEPS_CONFIG,
  type QuizAnswers,
  type QuizStepId,
} from "@/lib/quiz";
import { ANIMATION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PropertyCard } from "@/components/property/PropertyCard";

const stepIcon: Record<QuizStepId, React.ComponentType<any>> = {
  propertyType: Home,
  subType: LayoutGrid,
  location: MapPin,
  timeline: CalendarClock,
  buyerType: UserCheck,
};

export default function FindPage() {
  const [history, setHistory] = useState<QuizStepId[]>(["propertyType"]);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [done, setDone] = useState(false);

  const currentStepId = history[history.length - 1];
  const stepsPath = useMemo(() => getPathSteps(answers), [answers]);
  const currentStepIndex = stepsPath.findIndex((s) => s.id === currentStepId);
  const currentStepConfig = useMemo(() => {
    if (currentStepId === "subType") {
      return QUIZ_STEPS_CONFIG.subType(answers);
    }
    return QUIZ_STEPS_CONFIG[currentStepId];
  }, [currentStepId, answers]);

  const Icon = stepIcon[currentStepId];
  const progress = done
    ? 100
    : stepsPath.length > 0
    ? ((currentStepIndex + 1) / stepsPath.length) * 100
    : 0;

  const result = useMemo(
    () => (done ? shortlistProperties(answers) : null),
    [done, answers]
  );

  function choose(value: string) {
    const nextAnswers = { ...answers, [currentStepId]: value };
    
    // If the step is subType or location and value changed, clean up downstream answers
    if (currentStepId === "subType" && answers.subType !== value) {
      delete nextAnswers.location;
      delete nextAnswers.timeline;
      delete nextAnswers.buyerType;
    } else if (currentStepId === "location" && answers.location !== value) {
      delete nextAnswers.timeline;
      delete nextAnswers.buyerType;
    } else if (currentStepId === "timeline" && answers.timeline !== value) {
      delete nextAnswers.buyerType;
    }

    setAnswers(nextAnswers);

    const nextStepId = getNextStepId(currentStepId, nextAnswers);
    if (nextStepId) {
      setTimeout(() => {
        setHistory((prev) => [...prev, nextStepId]);
      }, 200);
    } else {
      setTimeout(() => {
        setDone(true);
      }, 200);
    }
  }

  function back() {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1));
    }
  }

  function restart() {
    setAnswers({});
    setHistory(["propertyType"]);
    setDone(false);
  }

  return (
    <div className="min-h-screen bg-cream pt-24">
      <div className="container-px py-10 sm:py-16">
        {/* Progress */}
        <div className="mx-auto max-w-2xl">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-cream-deep">
            <motion.div
              className="h-full rounded-full bg-secondary"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: ANIMATION.easeOut }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={currentStepId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: ANIMATION.easeOut }}
              className="mx-auto mt-10 max-w-2xl text-center"
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-secondary shadow-soft">
                {Icon && <Icon className="h-6 w-6" />}
              </span>
              <p className="mt-5 eyebrow">
                {stepsPath.length > 0
                  ? `Question ${currentStepIndex + 1} of ${stepsPath.length}`
                  : "Find Your Home"}
              </p>
              <h1 className="mt-3 font-heading text-[28px] font-semibold leading-tight text-primary sm:text-4xl">
                {currentStepConfig?.question}
              </h1>

              <div
                className={cn(
                  "mt-8 grid gap-4",
                  currentStepId === "location"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-center"
                    : "sm:grid-cols-2"
                )}
              >
                {currentStepConfig?.options.map((opt) => {
                  const selected = answers[currentStepId] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => choose(opt.value)}
                      className={cn(
                        "group relative flex min-h-[72px] flex-col justify-center items-start rounded-2xl border bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-soft",
                        selected
                          ? "border-secondary ring-2 ring-secondary/30"
                          : "border-line-strong"
                      )}
                    >
                      <span className="font-heading text-base font-semibold text-primary">
                        {opt.label}
                      </span>
                      {opt.description && (
                        <span className="mt-1 text-xs text-primary-600">
                          {opt.description}
                        </span>
                      )}
                      {selected && (
                        <span className="absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full bg-secondary text-white">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {history.length > 1 && (
                <button
                  onClick={back}
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-secondary"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: ANIMATION.easeOut }}
              className="mt-10"
            >
              <div className="mx-auto max-w-2xl text-center">
                <p className="eyebrow">Your Shortlist</p>
                <h1 className="mt-3 font-heading text-[28px] font-semibold leading-tight text-primary sm:text-4xl">
                  {result && result.matches.length === 0
                    ? "We couldn't find an exact match."
                    : result?.exact
                    ? "Homes matched your selection"
                    : "Closest matches we found"}
                </h1>
                <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-primary-600">
                  {result && result.matches.length === 0
                    ? "No properties in the current Tricity catalog matched your criteria. Contact us to find custom matches."
                    : result?.exact
                    ? "Based on your criteria, these are the best options currently available in our collection."
                    : "No properties matched all criteria exactly, but here are the closest options we found."}
                </p>
              </div>

              {result && result.matches.length > 0 && (
                <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {result.matches.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              )}

              <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  onClick={restart}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-line-strong px-7 font-medium text-primary transition-colors hover:bg-white"
                >
                  <RotateCcw className="h-4 w-4" /> Start over
                </button>
                <Link
                  href="/properties"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-secondary px-8 font-medium text-white transition-colors hover:bg-secondary-700"
                >
                  See all properties
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
