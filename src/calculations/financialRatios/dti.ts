/**
 * Calculates the Debt-to-Income Ratio (DTI).
 * @param totalDebt - The total debt amount.
 * @param grossIncome - The gross income amount.
 * @returns The debt-to-income ratio as a percentage.
 * @throws Error if any parameter is invalid.
 */

export function calculateDTI(totalDebt: number, grossIncome: number): number {
    if (totalDebt < 0 || grossIncome <= 0) {
      throw new Error('Total debt must be non-negative and gross income must be greater than zero.');
    }
  
    const dti = (totalDebt / grossIncome) * 100;
    return parseFloat(dti.toFixed(2));
  }
  