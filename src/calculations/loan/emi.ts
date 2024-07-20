/**
 * Calculates the Equated Monthly Installment (EMI) for a loan.
 * @param principal - The loan amount.
 * @param rate - The annual interest rate (in percentage).
 * @param term - The loan term in months.
 * @returns The EMI amount.
 * @throws Error if any parameter is invalid.
 */

export function calculateEMI(principal: number, rate: number, term: number): number {
  if (principal <= 0 || rate <= 0 || term <= 0) {
    throw new Error('Principal, rate, and term must be greater than zero.');
  }

  const monthlyRate = rate / 12 / 100;
  if (monthlyRate === 0) {
    return principal / term;
  }

  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
  return parseFloat(emi.toFixed(2));
}
