"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { calculateMortgage } from "@/lib/mortgage";
import { formatPrice } from "@/lib/utils";

interface MortgageCalculatorProps {
  defaultPrice?: number;
  compact?: boolean;
}

export function MortgageCalculator({
  defaultPrice = 15_000_000,
  compact = false,
}: MortgageCalculatorProps) {
  const [homePrice, setHomePrice] = useState(defaultPrice);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [term, setTerm] = useState(20);

  const downPayment = Math.round((homePrice * downPct) / 100);

  const result = useMemo(
    () =>
      calculateMortgage({
        homePrice,
        downPayment,
        interestRate: rate,
        loanTermYears: term,
      }),
    [homePrice, downPayment, rate, term]
  );

  return (
    <div className="card-surface p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary/10 text-secondary">
          <Calculator className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-heading text-lg font-semibold text-primary">
            Home Loan (EMI) Calculator
          </h3>
          <p className="text-sm text-primary-600">Estimate your monthly payment</p>
        </div>
      </div>

      <div className={compact ? "space-y-5" : "grid gap-6 md:grid-cols-2"}>
        <div className="space-y-5">
          <Field label="Home Price" value={formatPrice(homePrice)}>
            <input
              type="range"
              min={2_000_000}
              max={200_000_000}
              step={100_000}
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="range-input"
              aria-label="Home price"
            />
          </Field>

          <Field
            label="Down Payment"
            value={`${downPct}% · ${formatPrice(downPayment)}`}
          >
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={downPct}
              onChange={(e) => setDownPct(Number(e.target.value))}
              className="range-input"
              aria-label="Down payment percent"
            />
          </Field>

          <Field label="Interest Rate" value={`${rate.toFixed(2)}%`}>
            <input
              type="range"
              min={5}
              max={15}
              step={0.05}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="range-input"
              aria-label="Interest rate"
            />
          </Field>

          <Field label="Loan Term" value={`${term} yrs`}>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="range-input"
              aria-label="Loan term in years"
            />
          </Field>
        </div>

        {/* Result */}
        <div className="flex flex-col justify-center rounded-2xl bg-primary p-6 text-center text-white">
          <p className="text-sm text-white/70">Estimated Monthly EMI</p>
          <p className="mt-2 font-heading text-4xl font-bold text-accent">
            {formatPrice(result.monthlyPayment)}
          </p>
          <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-left text-sm">
            <Row label="Loan Amount" value={formatPrice(result.loanAmount)} />
            <Row label="Total Interest" value={formatPrice(result.totalInterest)} />
            <Row label="Total Cost" value={formatPrice(result.totalPayment)} />
          </div>
          <p className="mt-5 text-xs text-white/50">
            Estimates only. Actual rates and payments are set by your lender.
          </p>
        </div>
      </div>

      <style jsx>{`
        .range-input {
          width: 100%;
          height: 6px;
          border-radius: 9999px;
          background: #e5e0d8;
          -webkit-appearance: none;
          appearance: none;
          cursor: pointer;
        }
        .range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #8b6f47;
          box-shadow: 0 2px 6px rgba(26, 26, 26, 0.2);
        }
        .range-input::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #8b6f47;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-primary">{label}</span>
        <span className="text-sm font-semibold text-secondary">{value}</span>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/70">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
