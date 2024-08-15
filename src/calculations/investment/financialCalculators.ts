/**
 * Calculates the Equated Monthly Installment (EMI) for a loan.
 * @param principal - The loan amount (principal).
 * @param annualInterestRate - The annual interest rate (in percentage).
 * @param loanTenureInYears - The loan tenure in years.
 * @returns The EMI value.
 * @throws Error if any parameter is invalid.
 */
export function calculateEMI(
  principal: number,
  annualInterestRate: number,
  loanTenureInYears: number
): number {
  if (principal <= 0 || annualInterestRate <= 0 || loanTenureInYears <= 0) {
    throw new Error(
      "Principal, annual interest rate, and loan tenure must be greater than zero."
    );
  }

  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const totalMonths = loanTenureInYears * 12;

  const emi =
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, totalMonths)) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

  return parseFloat(emi.toFixed(2));
}
