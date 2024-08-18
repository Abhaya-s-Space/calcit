/**
 * Calculates the maturity amount of a Fixed Deposit (FD).
 * @param principal - The initial amount deposited.
 * @param annualInterestRate - The annual interest rate (in percentage).
 * @param totalYears - The total duration of the FD in years.
 * @param compoundingFrequency - The number of times interest is compounded per year.
 * @returns The maturity amount of the FD.
 * @throws Error if any parameter is invalid.
 */

export function calculateFD(
  principal: number,
  annualInterestRate: number,
  totalYears: number,
  compoundingFrequency: number = 1 // Default to annual compounding
): number {
  if (
    principal <= 0 ||
    annualInterestRate <= 0 ||
    totalYears <= 0 ||
    compoundingFrequency <= 0
  ) {
    throw new Error(
      "Principal, annual interest rate, total years, and compounding frequency must be greater than zero."
    );
  }

  const effectiveRate = annualInterestRate / 100 / compoundingFrequency;
  const totalPeriods = totalYears * compoundingFrequency;
  const maturityAmount = principal * Math.pow(1 + effectiveRate, totalPeriods);
  return parseFloat(maturityAmount.toFixed(2));
}

/**
 * Calculates the maturity amount of a Recurring Deposit (RD).
 * @param monthlyInvestment - The amount deposited monthly.
 * @param annualInterestRate - The annual interest rate (in percentage).
 * @param totalYears - The total duration of the RD in years.
 * @returns The maturity amount of the RD.
 * @throws Error if any parameter is invalid.
 */

export function calculateRD(
  monthlyInvestment: number,
  annualInterestRate: number,
  totalYears: number
): number {
  if (monthlyInvestment <= 0 || annualInterestRate <= 0 || totalYears <= 0) {
    throw new Error(
      "Monthly investment, annual interest rate, and total years must be greater than zero."
    );
  }

  const quarterlyInterestRate = annualInterestRate / 4 / 100;
  const totalQuarters = totalYears * 4;
  let maturityAmount = 0;

  for (let i = 1; i <= totalQuarters * 3; i++) {
    maturityAmount +=
      monthlyInvestment *
      Math.pow(1 + quarterlyInterestRate, (totalQuarters * 3 - i) / 3);
  }

  return parseFloat(maturityAmount.toFixed(2));
}
