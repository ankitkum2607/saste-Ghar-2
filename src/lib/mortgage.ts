export interface MortgageInput {
  homePrice: number;
  downPayment: number; // absolute amount
  interestRate: number; // annual %, e.g. 8.5
  loanTermYears: number;
}

export interface MortgageResult {
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

/**
 * Standard amortized loan payment (EMI).
 * M = P * r(1+r)^n / ((1+r)^n - 1)
 * Handles 0% interest and validates inputs defensively.
 */
export function calculateMortgage({
  homePrice,
  downPayment,
  interestRate,
  loanTermYears,
}: MortgageInput): MortgageResult {
  const safePrice = Math.max(0, homePrice);
  const safeDown = Math.min(Math.max(0, downPayment), safePrice);
  const loanAmount = Math.max(0, safePrice - safeDown);
  const months = Math.max(1, Math.round(loanTermYears * 12));
  const monthlyRate = Math.max(0, interestRate) / 100 / 12;

  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / months;
  } else {
    const factor = Math.pow(1 + monthlyRate, months);
    monthlyPayment = (loanAmount * monthlyRate * factor) / (factor - 1);
  }

  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - loanAmount;

  return {
    loanAmount: round(loanAmount),
    monthlyPayment: round(monthlyPayment),
    totalPayment: round(totalPayment),
    totalInterest: round(totalInterest),
  };
}

function round(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
