/**
 * Calculates the macronutrient distribution based on TDEE and macronutrient ratio.
 * @param tdee - Total Daily Energy Expenditure in calories.
 * @param goal - The fitness goal ("balanced", "low_carb", "high_carb", "ketogenic").
 * @returns An object containing the grams of protein, fat, and carbs.
 * @throws Error if the TDEE or goal is invalid.
 */
export function calculateMacros(
  tdee: number,
  goal: "balanced" | "low_carb" | "high_carb" | "ketogenic"
): { protein: number; fat: number; carbs: number } {
  if (tdee <= 0) {
    throw new Error("TDEE must be greater than zero.");
  }

  const macronutrientRatios: {
    [key: string]: { protein: number; fat: number; carbs: number };
  } = {
    balanced: { protein: 0.3, fat: 0.3, carbs: 0.4 },
    low_carb: { protein: 0.4, fat: 0.4, carbs: 0.2 },
    high_carb: { protein: 0.2, fat: 0.2, carbs: 0.6 },
    ketogenic: { protein: 0.25, fat: 0.7, carbs: 0.05 },
  };

  if (!(goal in macronutrientRatios)) {
    throw new Error(
      "Invalid goal. Choose 'balanced', 'low_carb', 'high_carb', or 'ketogenic'."
    );
  }

  const {
    protein: proteinRatio,
    fat: fatRatio,
    carbs: carbRatio,
  } = macronutrientRatios[goal];

  const proteinCalories = tdee * proteinRatio;
  const fatCalories = tdee * fatRatio;
  const carbCalories = tdee * carbRatio;

  const protein = parseFloat((proteinCalories / 4).toFixed(2));
  const fat = parseFloat((fatCalories / 9).toFixed(2));
  const carbs = parseFloat((carbCalories / 4).toFixed(2));

  return { protein, fat, carbs };
}
