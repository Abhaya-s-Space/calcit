/**
 * Calculates the maturity amount of the Public Provident Fund (PPF).
 * @param annualInvestment - The amount invested annually.
 * @param annualInterestRate - The annual interest rate (in percentage).
 * @param totalYears - The total duration of the PPF account in years (usually 15 years).
 * @returns The maturity amount of the PPF account.
 * @throws Error if any parameter is invalid.
 */
export function calculatePPF(
  annualInvestment: number,
  annualInterestRate: number,
  totalYears: number = 15 // Default to 15 years as it's the common tenure for PPF
): number {
  if (annualInvestment <= 0 || annualInterestRate <= 0 || totalYears <= 0) {
    throw new Error(
      "Annual investment, annual interest rate, and total years must be greater than zero."
    );
  }

  let maturityAmount = 0;
  let accumulatedAmount = 0;

  for (let year = 1; year <= totalYears; year++) {
    accumulatedAmount += annualInvestment;
    maturityAmount =
      accumulatedAmount * Math.pow(1 + annualInterestRate / 100, year);
  }

  return parseFloat(maturityAmount.toFixed(2));
}

/**
 * Calculates the maturity amount of the Employee Provident Fund (EPF).
 * @param basicSalary - The basic salary of the employee.
 * @param employeeContributionRate - The percentage of the basic salary contributed by the employee (usually 12%).
 * @param employerContributionRate - The percentage of the basic salary contributed by the employer (usually 3.67% for EPF).
 * @param annualInterestRate - The annual interest rate for EPF (in percentage).
 * @param totalYears - The total number of years of service.
 * @returns The maturity amount of the EPF account.
 * @throws Error if any parameter is invalid.
 */
export function calculateEPF(
  basicSalary: number,
  employeeContributionRate: number = 12,
  employerContributionRate: number = 3.67,
  annualInterestRate: number = 8.5,
  totalYears: number
): number {
  if (
    basicSalary <= 0 ||
    employeeContributionRate <= 0 ||
    employerContributionRate <= 0 ||
    annualInterestRate <= 0 ||
    totalYears <= 0
  ) {
    throw new Error(
      "Basic salary, contribution rates, interest rate, and total years must be greater than zero."
    );
  }

  const monthlyEmployeeContribution =
    (basicSalary * employeeContributionRate) / 100;
  const monthlyEmployerContribution =
    (basicSalary * employerContributionRate) / 100;
  let totalEmployeeContribution = 0;
  let totalEmployerContribution = 0;
  let totalInterest = 0;

  for (let year = 1; year <= totalYears; year++) {
    const yearlyContribution =
      (monthlyEmployeeContribution + monthlyEmployerContribution) * 12;
    const interest =
      (totalEmployeeContribution +
        totalEmployerContribution +
        yearlyContribution) *
      (annualInterestRate / 100);

    totalEmployeeContribution += monthlyEmployeeContribution * 12;
    totalEmployerContribution += monthlyEmployerContribution * 12;
    totalInterest += interest;
  }

  const maturityAmount =
    totalEmployeeContribution + totalEmployerContribution + totalInterest;

  return parseFloat(maturityAmount.toFixed(2));
}

/**
 * Calculates the HRA (House Rent Allowance) exemption.
 * @param basicSalary - The basic salary of the employee.
 * @param hraReceived - The HRA received from the employer.
 * @param rentPaid - The actual rent paid by the employee.
 * @param isMetroCity - Boolean indicating if the employee lives in a metro city (e.g., Delhi, Mumbai, Kolkata, Chennai).
 * @returns The HRA exemption amount.
 * @throws Error if any parameter is invalid.
 */
export function calculateHRAExemption(
  basicSalary: number,
  hraReceived: number,
  rentPaid: number,
  isMetroCity: boolean
): number {
  if (basicSalary <= 0 || hraReceived <= 0 || rentPaid <= 0) {
    throw new Error(
      "Basic salary, HRA received, and rent paid must be greater than zero."
    );
  }

  // Calculate 10% of basic salary
  const tenPercentOfSalary = basicSalary * 0.1;

  // Calculate 50% or 40% of basic salary based on metro or non-metro city
  const salaryPercentage = isMetroCity ? 0.5 : 0.4;
  const salaryPercentageAmount = basicSalary * salaryPercentage;

  // Calculate the amount of rent paid minus 10% of basic salary
  const rentMinusTenPercent = rentPaid - tenPercentOfSalary;

  // The HRA exemption is the minimum of the following three amounts:
  const hraExemption = Math.min(
    hraReceived,
    rentMinusTenPercent,
    salaryPercentageAmount
  );

  return Math.max(0, hraExemption); // Ensure the exemption is not negative
}

/**
 * Calculates the income tax based on the taxable income using the old tax regime.
 * @param taxableIncome - The taxable income of the individual.
 * @returns The calculated income tax.
 * @throws Error if the taxable income is invalid.
 */
export function calculateIncomeTax(taxableIncome: number): number {
  if (taxableIncome <= 0) {
    throw new Error("Taxable income must be greater than zero.");
  }

  let tax = 0;

  // Tax slabs for the old tax regime in India
  if (taxableIncome <= 250000) {
    tax = 0;
  } else if (taxableIncome > 250000 && taxableIncome <= 500000) {
    tax = (taxableIncome - 250000) * 0.05;
  } else if (taxableIncome > 500000 && taxableIncome <= 1000000) {
    tax = 250000 * 0.05 + (taxableIncome - 500000) * 0.2;
  } else {
    tax = 250000 * 0.05 + 500000 * 0.2 + (taxableIncome - 1000000) * 0.3;
  }

  // Add 4% cess on tax
  const cess = tax * 0.04;
  tax += cess;

  return parseFloat(tax.toFixed(2));
}

interface TaxCalculation {
  oldRegimeTax: number;
  newRegimeTax: number;
  recommendedRegime: string;
}

/**
 * Calculates the tax liability under both old and new regimes and recommends the better option.
 * @param grossIncome - The gross income before deductions.
 * @param hraExemption - The HRA exemption amount (if applicable).
 * @param section80CDeduction - The total deduction under Section 80C.
 * @param section80DDeduction - The total deduction under Section 80D.
 * @param otherDeductions - Other eligible deductions (e.g., home loan interest).
 * @returns An object containing tax liabilities under both regimes and the recommended regime.
 */
export function calculateAdvancedIncomeTax(
  grossIncome: number,
  hraExemption: number = 0,
  section80CDeduction: number = 0,
  section80DDeduction: number = 0,
  otherDeductions: number = 0
): TaxCalculation {
  // Ensure deductions do not exceed limits
  const maxSection80CDeduction = Math.min(section80CDeduction, 150000);
  const maxSection80DDeduction = section80DDeduction;

  // Calculate taxable income under old regime
  const totalDeductions =
    hraExemption +
    maxSection80CDeduction +
    maxSection80DDeduction +
    otherDeductions +
    50000; // including standard deduction
  const taxableIncomeOldRegime = Math.max(0, grossIncome - totalDeductions);

  // Tax calculation under the old regime
  let oldRegimeTax = 0;
  if (taxableIncomeOldRegime > 1000000) {
    oldRegimeTax += (taxableIncomeOldRegime - 1000000) * 0.3 + 112500;
  } else if (taxableIncomeOldRegime > 500000) {
    oldRegimeTax += (taxableIncomeOldRegime - 500000) * 0.2 + 12500;
  } else if (taxableIncomeOldRegime > 250000) {
    oldRegimeTax += (taxableIncomeOldRegime - 250000) * 0.05;
  }

  // Apply Section 87A rebate under old regime if applicable
  if (taxableIncomeOldRegime <= 500000) {
    oldRegimeTax = Math.max(0, oldRegimeTax - 12500);
  }

  // Add 4% cess on tax
  const cess = oldRegimeTax * 0.04;
  oldRegimeTax += cess;
  oldRegimeTax = parseFloat(oldRegimeTax.toFixed(2));

  // Tax calculation under the new regime (no deductions)
  const taxableIncomeNewRegime = grossIncome;
  let newRegimeTax = 0;
  if (taxableIncomeNewRegime > 1500000) {
    newRegimeTax += (taxableIncomeNewRegime - 1500000) * 0.3 + 187500;
  } else if (taxableIncomeNewRegime > 1250000) {
    newRegimeTax += (taxableIncomeNewRegime - 1250000) * 0.25 + 125000;
  } else if (taxableIncomeNewRegime > 1000000) {
    newRegimeTax += (taxableIncomeNewRegime - 1000000) * 0.2 + 75000;
  } else if (taxableIncomeNewRegime > 750000) {
    newRegimeTax += (taxableIncomeNewRegime - 750000) * 0.15 + 37500;
  } else if (taxableIncomeNewRegime > 500000) {
    newRegimeTax += (taxableIncomeNewRegime - 500000) * 0.1 + 12500;
  } else if (taxableIncomeNewRegime > 250000) {
    newRegimeTax += (taxableIncomeNewRegime - 250000) * 0.05;
  }

  // Apply Section 87A rebate under new regime if applicable
  if (taxableIncomeNewRegime <= 500000) {
    newRegimeTax = Math.max(0, newRegimeTax - 12500);
  }

  // Add 4% cess on tax
  const newRegimecess = newRegimeTax * 0.04;
  newRegimeTax += newRegimecess;

  newRegimeTax = parseFloat(newRegimeTax.toFixed(2));

  // Determine the better regime
  const recommendedRegime =
    oldRegimeTax <= newRegimeTax ? "Old Regime" : "New Regime";

  return {
    oldRegimeTax,
    newRegimeTax,
    recommendedRegime,
  };
}
