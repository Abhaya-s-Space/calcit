/**
 * Calculates the maturity amount of a Systematic Investment Plan (SIP).
 * @param monthlyInvestment - The amount invested monthly.
 * @param annualReturnRate - The annual return rate (in percentage).
 * @param totalYears - The total number of investment months.
 * @returns The maturity amount.
 * @throws Error if any parameter is invalid.
 */

export function calculateSIP(
  monthlyInvestment: number,
  annualReturnRate: number,
  totalYears: number
): number {
  if (monthlyInvestment <= 0 || annualReturnRate <= 0 || totalYears <= 0) {
    throw new Error(
      "Monthly investment, annual return rate, and total months must be greater than zero."
    );
  }

  const monthlyReturnRate = annualReturnRate / 12 / 100;
  const totalMonths = totalYears * 12;
  const maturityAmount =
    monthlyInvestment *
    ((Math.pow(1 + monthlyReturnRate, totalMonths) - 1) / monthlyReturnRate) *
    (1 + monthlyReturnRate);
  return parseFloat(maturityAmount.toFixed(2));
}

/**
 * Calculates the maturity amount of a Systematic Investment Plan (SIP) with an annual step-up.
 * @param initialInvestment - The initial monthly investment amount.
 * @param annualReturnRate - The annual return rate (in percentage).
 * @param totalYears - The total number of investment years.
 * @param stepUpRate - The annual step-up rate (in percentage).
 * @returns The maturity amount.
 * @throws Error if any parameter is invalid.
 */

export function calculateStepUpSIP(
  initialInvestment: number,
  annualReturnRate: number,
  totalYears: number,
  stepUpRate: number
): number {
  if (
    initialInvestment <= 0 ||
    annualReturnRate <= 0 ||
    totalYears <= 0 ||
    stepUpRate < 0
  ) {
    throw new Error(
      "Initial investment, annual return rate, total years must be greater than zero, and step-up rate must be non-negative."
    );
  }

  const monthlyReturnRate = annualReturnRate / 12 / 100;
  let maturityAmount = 0;

  for (let year = 0; year < totalYears; year++) {
    const currentInvestment =
      initialInvestment * Math.pow(1 + stepUpRate / 100, year);
    const monthsRemaining = (totalYears - year) * 12;

    maturityAmount +=
      currentInvestment *
      ((Math.pow(1 + monthlyReturnRate, monthsRemaining) - 1) /
        monthlyReturnRate) *
      (1 + monthlyReturnRate);
  }

  return parseFloat(maturityAmount.toFixed(2));
}

/**
 * Calculates the duration (in months) for which an investment will last with a Systematic Withdrawal Plan (SWP).
 * @param initialCorpus - The initial investment corpus.
 * @param withdrawalAmount - The fixed amount withdrawn at regular intervals (monthly).
 * @param annualReturnRate - The annual return rate (in percentage).
 * @returns The number of months the corpus will last.
 * @throws Error if any parameter is invalid.
 */

export function calculateSWPDuration(
  initialCorpus: number,
  withdrawalAmount: number,
  annualReturnRate: number
): number {
  if (initialCorpus <= 0 || withdrawalAmount <= 0 || annualReturnRate < 0) {
    throw new Error(
      "Initial corpus, withdrawal amount must be greater than zero, and annual return rate must be non-negative."
    );
  }

  const monthlyReturnRate = annualReturnRate / 12 / 100;
  let remainingCorpus = initialCorpus;
  let months = 0;

  while (remainingCorpus > 0) {
    const monthlyGrowth = remainingCorpus * monthlyReturnRate;
    remainingCorpus = remainingCorpus + monthlyGrowth - withdrawalAmount;
    months++;
    if (remainingCorpus < 0) {
      break;
    }
  }

  return months;
}

/**
 * Calculates the fixed monthly withdrawal amount for a desired duration with a Systematic Withdrawal Plan (SWP).
 * @param initialCorpus - The initial investment corpus.
 * @param durationMonths - The desired duration in months.
 * @param annualReturnRate - The annual return rate (in percentage).
 * @returns The fixed monthly withdrawal amount.
 * @throws Error if any parameter is invalid.
 */

export function calculateSWPAmount(
  initialCorpus: number,
  durationMonths: number,
  annualReturnRate: number
): number {
  if (initialCorpus <= 0 || durationMonths <= 0 || annualReturnRate < 0) {
    throw new Error(
      "Initial corpus, duration in months must be greater than zero, and annual return rate must be non-negative."
    );
  }

  const monthlyReturnRate = annualReturnRate / 12 / 100;
  const monthlyWithdrawalAmount =
    (initialCorpus * monthlyReturnRate) /
    (1 - Math.pow(1 + monthlyReturnRate, -durationMonths));

  return parseFloat(monthlyWithdrawalAmount.toFixed(2));
}

/**
 * Calculates the future value of a lumpsum investment.
 * @param principal - The initial investment amount (lumpsum).
 * @param annualReturnRate - The annual return rate (in percentage).
 * @param totalYears - The total number of years for which the investment is made.
 * @returns The future value of the lumpsum investment.
 * @throws Error if any parameter is invalid.
 */

export function calculateLumpsum(
  principal: number,
  annualReturnRate: number,
  totalYears: number
): number {
  if (principal <= 0 || annualReturnRate <= 0 || totalYears <= 0) {
    throw new Error(
      "Principal, annual return rate, and total years must be greater than zero."
    );
  }

  const futureValue =
    principal * Math.pow(1 + annualReturnRate / 100, totalYears);
  return parseFloat(futureValue.toFixed(2));
}
