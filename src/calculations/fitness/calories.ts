import { calculateBMR } from "./bmr";

/**
 * Calculates the Total Daily Energy Expenditure (TDEE) based on activity level.
 * @param weight - The weight of the person in kilograms.
 * @param height - The height of the person in centimeters.
 * @param age - The age of the person in years.
 * @param gender - The gender of the person ("male" or "female").
 * @param activityLevel - The activity level of the person ("sedentary", "light", "moderate", "active", "very_active").
 * @returns An object containing the TDEE value and its activity category.
 * @throws Error if any parameter is invalid.
 */
export function calculateCalories(
  weight: number,
  height: number,
  age: number,
  gender: "male" | "female",
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active"
): { tdee: number; category: string } {
  if (weight <= 0 || height <= 0 || age <= 0) {
    throw new Error("Weight, height, and age must be greater than zero.");
  }

  let bmr = calculateBMR(weight, height, age, gender);

  // Activity level multipliers
  const activityMultipliers: { [key: string]: number } = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  if (!(activityLevel in activityMultipliers)) {
    throw new Error(
      "Invalid activity level. Use 'sedentary', 'light', 'moderate', 'active', or 'very_active'."
    );
  }

  const tdee = bmr * activityMultipliers[activityLevel];
  const roundedTDEE = parseFloat(tdee.toFixed(2));

  let category: string;

  if (roundedTDEE < 1800) {
    category = "Low caloric needs";
  } else if (roundedTDEE >= 1800 && roundedTDEE < 2500) {
    category = "Moderate caloric needs";
  } else {
    category = "High caloric needs";
  }

  return { tdee: roundedTDEE, category };
}
