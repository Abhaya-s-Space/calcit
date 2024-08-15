/**
 * Calculates the maturity amount of a Public Provident Fund (PPF).
 * @param annualInvestment - The amount invested annually.
 * @param annualInterestRate - The annual interest rate (in percentage).
 * @param totalYears - The total duration of the PPF account in years (usually 15 years).
 * @returns The maturity amount of the PPF account.
 * @throws Error if any parameter is invalid.
 */
export function calculatePPF(
  annualInvestment: number,
  annualInterestRate: number,
  totalYears: number = 15 // Default to 15 years as it's the common tenure for PPF
): number {
  if (annualInvestment <= 0 || annualInterestRate <= 0 || totalYears <= 0) {
    throw new Error(
      "Annual investment, annual interest rate, and total years must be greater than zero."
    );
  }

  let maturityAmount = 0;
  let accumulatedAmount = 0;

  for (let year = 1; year <= totalYears; year++) {
    accumulatedAmount += annualInvestment;
    maturityAmount =
      accumulatedAmount * Math.pow(1 + annualInterestRate / 100, year);
  }

  return parseFloat(maturityAmount.toFixed(2));
}
