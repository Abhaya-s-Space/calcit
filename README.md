# Calcit

<h1 align="center">
	<br>
	<img width="500" src="./calcit-logo.png" alt="Calcit Logo">
	<br>
	<br>
</h1>

<!-- <p style="text-align: center; background-color: rgba(255, 255, 255, 0.05); padding: 10px; border-radius: 5px; color: #15b7b9; font-weight: bold; font-size: 1.1rem; letter-spacing: 0.05rem;">
Your go-to advanced calculators package.
</p> -->

> Your go-to advanced calculators package.

[![Downloads](https://badgen.net/npm/dt/calc-it)](https://www.npmjs.com/package/calc-it)

## Description

**Calcit** is an NPM package that provides various calculations across different categories. It includes loan-related calculations, investment calculations, fitness metrics, and financial ratios. Whether you're calculating EMIs for loans, returns on investments, or tracking fitness metrics, Calcit makes it easy.

## Highlights

- 📊 **Expressive API**: Simple, clean functions.
- ⚡ **Highly performant**: Optimized calculations.
- 🧮 **No dependencies**: Lightweight and easy. No Dependency.
- 🔄 **Modular design**: Pick yourself (loans, investments, fitness, etc.).
- 🌍 **Comprehensive support**: Wide range of calculations.
- 🔍 **TypeScript support**: Strongly typed API.
- 🛠 **Actively maintained**: Regular updates for latest features and improvements.
- 📦 **Used across industries**: Suitable for fintech, fitness, health, and real estate.

## Installation

To install Calcit, run the following command in your project directory:

```bash
npm install calcit
```

## Features

- [Loan-related calculations](#loan-related-calculations) (EMI, total interest, etc.)
- [Investment-related calculations](#investment-related-calculations) (SIP, ROI, compound interest, etc.)
- [Fitness-related calculations](#fitness-related-calculations) (BMI, calorie burn, etc.)
- [Financial ratio calculations](#financial-ratio-calculations) (Debt-to-Income ratio, dividend yield, etc.)

## Usage

### Loan-related calculations

Calculate the Equivalent Monthly Installment (EMI) for a loan.

```ts
import { calculateEMI } from "calcit";

const principal = 1000;
const annualRate = 10;
const loanTenureInYears = 10;

const emi = calculateEMI(principal, annualRate, loanTenureInYears);

console.log(emi); // Output: 120.0
```

Other Loan calculations include:

- Business Loan Monthly Payment and Business Loan Details
- Home Loan Monthly Payment and Home Loan Details
- Education Loan Monthly Payment and Education Loan Details
- Personal Loan Monthly Payment and Personal Loan Details

### Investment-related calculations

Calculate your taxable income, income tax, and tax liability under both old and new regimes.

```ts
import { calculateIncomeTax, calculateAdvancedIncomeTax } from "calcit";

// Example 1: Calculating income tax using the old regime
const taxableIncome = 850000;
const incomeTax = calculateIncomeTax(taxableIncome);

console.log(
  `Income tax for ₹${taxableIncome} under the old regime is ₹${incomeTax}`
);

// Example 2: Advanced tax calculation comparing both regimes
const grossIncome = 1200000;
const hraExemption = 150000;
const section80CDeduction = 150000;
const section80DDeduction = 50000;
const otherDeductions = 100000;

const { oldRegimeTax, newRegimeTax, recommendedRegime } =
  calculateAdvancedIncomeTax(
    grossIncome,
    hraExemption,
    section80CDeduction,
    section80DDeduction,
    otherDeductions
  );

console.log(`Tax under old regime: ₹${oldRegimeTax}`);
console.log(`Tax under new regime: ₹${newRegimeTax}`);
console.log(`Recommended regime: ${recommendedRegime}`);
```

Other Investment calculations include:

- Fixed Deposit and Recurring Deposit Maturity Amount
- Systematic Investment Plan Maturity Amount
- Systematic Withdrawal Plan Maturity Amount
- GST Amount and Total Price
- PPF, EPF, and HRA Exemption

### Fitness-related calculations

Calculate your Calories requirement and Macronutrient breakdown based on your weight, height, age, gender, and activity level.

```ts
import { calculateCalories, calculateMacros } from "calcit";

// Example 1: Calculating TDEE based on user's inputs
const weight = 70; // in kgs
const height = 175; // in cms
const age = 30; // in years
const gender = "male"; // enum
const activityLevel = "moderate";

const { tdee, category } = calculateCalories(
  weight,
  height,
  age,
  gender,
  activityLevel
);

console.log(`TDEE for a ${age}-year-old ${gender}: ${tdee} calories/day`);
console.log(`Activity category: ${category}`);

// Example 2: Calculating macronutrient distribution based on TDEE and goal
const goal = "balanced"; // Can be "balanced", "low_carb", "high_carb", or "ketogenic"

const { protein, fat, carbs } = calculateMacros(tdee, goal);

console.log(`Protein: ${macros.protein} grams/day`);
console.log(`Fat: ${macros.fat} grams/day`);
console.log(`Carbs: ${macros.carbs} grams/day`);
```

Other Fitness calculations include:

- BMI, BMR, and Calories
- One Rep Max
- Body Fat Percentage
- Heart Rate Reserve and Intensity Range

### Financial ratio calculations

Calculate your Debt-to-Income ratio and Dividend Yield.

```ts
import { calculateDebtToIncomeRatio, calculateDividendYield } from "calcit";

const totalDebt = 1000;
const grossIncome = 5000;

const debtToIncomeRatio = calculateDebtToIncomeRatio(totalDebt, grossIncome);

console.log(debtToIncomeRatio); // Output: 0.5

-----------------------------------------

const annualDividends = 50;
const stockPrice = 1000;

const dividendYield = calculateDividendYield(annualDividends, stockPrice);

console.log(`Dividend Yield: ${dividendYield}%`); // Output: 5.00%
```

Other Financial ratio calculations include:

- Debt-to-Income Ratio
- Dividend Yield
- Equity-to-Earnings Ratio
- Gross Profit Margin
- Net Profit Margin
- Return on Investment
- Return on Equity
- Return on Debt
- Return on Capital

## Contributing

Contributions are welcome! Please follow the guidelines outlined in the [contribution guidelines](./CONTRIBUTING.md).

## Maintainers

- [Abhaya Shankar](https://github.com/AbhayaShankar)
- [Gopi Rudra](https://github.com/Gopirudra-hub)
