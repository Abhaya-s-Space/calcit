/**
 * Calculates the Simple Interest (SI).
 * @param principal - The principal amount.
 * @param rate - The annual interest rate (in percentage).
 * @param time - The time period in years.
 * @returns The simple interest.
 * @throws Error if any parameter is invalid.
 */

export function calculateSimpleInterest(principal: number, rate: number, time: number): number {
    if (principal <= 0 || rate <= 0 || time <= 0) {
      throw new Error('Principal, rate, and time must be greater than zero.');
    }
  
    const interest = (principal * rate * time) / 100;
    return parseFloat(interest.toFixed(2));
  }
  