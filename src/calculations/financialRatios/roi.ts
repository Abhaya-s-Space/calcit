/**
 * Calculates the Return on Investment (ROI).
 * @param initialInvestment - The initial investment amount.
 * @param finalValue - The final value of the investment.
 * @returns The return on investment as a percentage.
 * @throws Error if any parameter is invalid.
 */

export function calculateROI(initialInvestment: number, finalValue: number): number {
    if (initialInvestment <= 0 || finalValue < 0) {
      throw new Error('Initial investment must be greater than zero and final value must be non-negative.');
    }
  
    const roi = ((finalValue - initialInvestment) / initialInvestment) * 100;
    return parseFloat(roi.toFixed(2));
  }
  