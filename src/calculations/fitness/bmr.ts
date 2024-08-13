/**
 * Calculates the Basal Metabolic Rate (BMR) using the Mifflin-St Jeor Equation.
 * @param weight - The weight of the person in kilograms.
 * @param height - The height of the person in centimeters.
 * @param age - The age of the person in years.
 * @param gender - The gender of the person ("male" or "female").
 * @returns The BMR value in calories per day.
 * @throws Error if any parameter is invalid.
 */
export function BMR(
  weight: number,
  height: number,
  age: number,
  gender: "male" | "female"
): number {
  if (weight <= 0 || height <= 0 || age <= 0) {
    throw new Error("Weight, height, and age must be greater than zero.");
  }

  let bmr: number;

  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender === "female") {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    throw new Error("Invalid gender. Use 'male' or 'female'.");
  }

  return parseFloat(bmr.toFixed(2));
}
