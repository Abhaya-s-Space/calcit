/**
 * Calculates the maturity amount of a Systematic Investment Plan (SIP).
 * @param monthlyInvestment - The amount invested monthly.
 * @param annualReturnRate - The annual return rate (in percentage).
 * @param totalMonths - The total number of investment months.
 * @returns The maturity amount.
 * @throws Error if any parameter is invalid.
 */

export function calculateSIP(monthlyInvestment: number, annualReturnRate: number, totalMonths: number): number {
    if (monthlyInvestment <= 0 || annualReturnRate <= 0 || totalMonths <= 0) {
      throw new Error('Monthly investment, annual return rate, and total months must be greater than zero.');
    }
  
    const monthlyReturnRate = annualReturnRate / 12 / 100;
    const maturityAmount = monthlyInvestment * ((Math.pow(1 + monthlyReturnRate, totalMonths) - 1) / monthlyReturnRate) * (1 + monthlyReturnRate);
    return parseFloat(maturityAmount.toFixed(2));
  }
  