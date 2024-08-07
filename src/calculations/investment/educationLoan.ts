/**
 * Calculates the monthly mortgage payment.
 * @param principal - The loan principal amount.
 * @param annualRate - The annual interest rate (in percentage).
 * @param loanTermYears - The loan term in years.
 * @returns The monthly mortgage payment.
 * @throws Error if any parameter is invalid.
 */
export function calculateEducationMonthlyPayment(
  principal: number,
  annualRate: number,
  loanTermYears: number
): number {
  if (principal <= 0 || annualRate <= 0 || loanTermYears <= 0) {
    throw new Error(
      "Principal, annual rate, and loan term must be greater than zero."
    );
  }

  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  const monthlyEmi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);

  return parseFloat(monthlyEmi.toFixed(2));
}

/**
 * Calculates the total payment and total interest over the life of the loan.
 * @param principal - The loan principal amount.
 * @param annualRate - The annual interest rate (in percentage).
 * @param loanTermYears - The loan term in years.
 * @returns An object containing the total payment and total interest.
 * @throws Error if any parameter is invalid.
 */
export function calculateEducationLoanDetails(
  principal: number,
  annualRate: number,
  loanTermYears: number
) {
  const monthlyEmi = calculateEducationMonthlyPayment(
    principal,
    annualRate,
    loanTermYears
  );
  const totalPayments = loanTermYears * 12;
  const totalPayment = monthlyEmi * totalPayments;
  const totalInterest = totalPayment - principal;

  return {
    totalPayment: parseFloat(totalPayment.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
  };
}
