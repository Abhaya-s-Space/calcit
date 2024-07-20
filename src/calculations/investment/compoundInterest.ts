/**
 * Calculates the Compound Interest (CI).
 * @param principal - The principal amount.
 * @param rate - The annual interest rate (in percentage).
 * @param timesCompounded - The number of times the interest is compounded per year.
 * @param years - The number of years.
 * @returns The compound interest.
 * @throws Error if any parameter is invalid.
 */
export function calculateCompoundInterest(principal: number, rate: number, timesCompounded: number, years: number): number {
  if (principal <= 0 || rate <= 0 || timesCompounded <= 0 || years <= 0) {
    throw new Error('Principal, rate, times compounded, and years must be greater than zero.');
  }

  const compoundAmount = principal * Math.pow(1 + rate / 100 / timesCompounded, timesCompounded * years);
  const interest = compoundAmount - principal;
  return parseFloat(interest.toFixed(2));
}
