/**
 * Calculates the maturity amount of a Public Provident Fund (PPF).
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

/**
 * Calculates the income tax considering various deductions and rebates.
 * @param grossIncome - The gross income of the individual.
 * @param deductions - An object containing various deductions such as 80C, 80D, HRA, etc.
 * @returns The calculated income tax after deductions.
 * @throws Error if any parameter is invalid.
 */
export function calculateAdvancedIncomeTax(
  grossIncome: number,
  deductions: {
    section80C?: number;
    section80D?: number;
    hraExemption?: number;
    homeLoanInterest?: number;
    npsContribution?: number;
    standardDeduction?: number;
    otherDeductions?: number;
  } = {}
): number {
  if (grossIncome <= 0) {
    throw new Error("Gross income must be greater than zero.");
  }

  // Default values for deductions
  const defaultDeductions = {
    section80C: 0,
    section80D: 0,
    hraExemption: 0,
    homeLoanInterest: 0,
    npsContribution: 0,
    standardDeduction: 50000, // Standard deduction is ₹50,000
    otherDeductions: 0,
  };

  // Merge default values with user input
  const {
    section80C,
    section80D,
    hraExemption,
    homeLoanInterest,
    npsContribution,
    standardDeduction,
    otherDeductions,
  } = { ...defaultDeductions, ...deductions };

  // Limit the maximum allowable deductions
  const maxSection80C = Math.min(section80C, 150000); // Max ₹1,50,000 for 80C
  const maxSection80D = Math.min(section80D, 75000); // Max ₹75,000 for 80D (depending on age)
  const maxHRAExemption = Math.min(hraExemption, grossIncome * 0.4); // Limit HRA to 40% of gross income

  // Calculate total deductions
  const totalDeductions =
    maxSection80C +
    maxSection80D +
    maxHRAExemption +
    homeLoanInterest +
    npsContribution +
    standardDeduction +
    otherDeductions;

  // Calculate taxable income
  const taxableIncome = grossIncome - totalDeductions;

  if (taxableIncome <= 0) {
    return 0; // No tax if taxable income is zero or negative
  }

  // Calculate tax based on old tax regime
  let tax = 0;

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
