/**
 * Calculates the Dividend Yield.
 * @param annualDividends - The annual dividends received.
 * @param stockPrice - The price of the stock.
 * @returns The dividend yield as a percentage.
 * @throws Error if any parameter is invalid.
 */

export function calculateDividendYield(annualDividends: number, stockPrice: number): number {
    if (annualDividends < 0 || stockPrice <= 0) {
      throw new Error('Annual dividends must be non-negative and stock price must be greater than zero.');
    }
  
    const dividendYield = (annualDividends / stockPrice) * 100;
    return parseFloat(dividendYield.toFixed(2));
  }
  