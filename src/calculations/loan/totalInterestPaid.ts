import { calculateEMI } from './emi';

/**
 * Calculates the total interest paid on a loan.
 * @param principal - The principal amount of the loan.
 * @param rate - The annual interest rate (in percentage).
 * @param term - The loan term in months.
 * @returns The total interest paid over the term of the loan.
 * @throws Error if any parameter is invalid.
 */
export function calculateTotalInterestPaid(principal: number, rate: number, term: number): number {
  if (principal <= 0 || rate <= 0 || term <= 0) {
    throw new Error('Principal, rate, and term must be greater than zero.');
  }

  const emi = calculateEMI(principal, rate, term);
  const totalPaid = emi * term;
  const totalInterestPaid = totalPaid - principal;
  return parseFloat(totalInterestPaid.toFixed(2));
}
