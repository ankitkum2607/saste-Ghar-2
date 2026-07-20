"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  MapPin,
  Wallet,
  BedDouble,
  CalendarClock,
  Check,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";
import {
  QUIZ_STEPS,
  shortlistProperties,
  type QuizAnswers,
} from "@/lib/quiz";
import { ANIMATION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PropertyCard } from "@/components/property/PropertyCard";

const stepIcon = [MapPin, Wallet, BedDouble, CalendarClock];

export default function FindPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [done, setDone] = useState(false);

  const current = QUIZ_STEPS[step];
  const Icon = stepIcon[step];
  const progress = done ? 100 : (step / QUIZ_STEPS.length) * 100;

  const result = useMemo(
    () => (done ? shortlistProperties(answers) : null),
    [done, answers]
  );

  function choose(value: string) {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);
    if (step < QUIZ_STEPS.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 200);
    } else {
      setTimeout(() => setDone(true), 200);
    }
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  return (
    <div className="min-h-screen bg-cream pt-24">
      <div className="container-px py-10 sm:py-16">
        {/* Progress */}
        <div className="mx-auto max-w-2xl">
          <div className="h-1 w-full overflow-hidden rounded-full bg-cream-deep">
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
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: ANIMATION.easeOut }}
              className="mx-auto mt-10 max-w-2xl text-center"
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-secondary shadow-soft">
                <Icon className="h-6 w-6" />
              </span>
              <p className="mt-5 eyebrow">{current.eyebrow}</p>
              <h1 className="mt-3 font-heading text-[28px] font-semibold leading-tight text-primary sm:text-4xl">
                {current.question}
              </h1>

              <div
                className={cn(
                  "mt-8 grid gap-3",
                  current.id === "city"
                    ? "grid-cols-2 sm:grid-cols-3"
                    : "sm:grid-cols-2"
                )}
              >
                {current.options.map((opt) => {
                  const selected = answers[current.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => choose(opt.value)}
                      className={cn(
                        "group relative flex min-h-[64px] flex-col items-start rounded-2xl border bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-soft",
                        selected
                          ? "border-secondary ring-2 ring-secondary/30"
                          : "border-line"
                      )}
                    >
                      <span className="font-heading text-base font-semibold text-primary">
                        {opt.label}
                      </span>
                      {opt.description && (
                        <span className="mt-0.5 text-sm text-primary-600">
                          {opt.description}
                        </span>
                      )}
                      {selected && (
                        <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-secondary text-white">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {step > 0 && (
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
                    ? "We couldn't find a match."
                    : result?.exact
                    ? "Three homes that fit."
                    : "Nothing fit exactly — here's the closest."}
                </h1>
                <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-primary-600">
                  {result && result.matches.length === 0
                    ? "Nothing in the current collection matches that brief. Tell us what you need and we'll go looking."
                    : result?.exact
                    ? "Based on your answers, these are the flats we'd put in front of you first."
                    : "None of our current flats matched every answer — so, honestly, here are the three that came closest. We'd rather show you these than pretend."}
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
