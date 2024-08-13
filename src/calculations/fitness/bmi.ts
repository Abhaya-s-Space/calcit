/**
 * Calculates the Body Mass Index (BMI).
 * @param weight - The weight of the person in kilograms.
 * @param height - The height of the person in meters.
 * @returns The BMI value.
 * @throws Error if weight or height is invalid.
 */
export function BMI(weight: number, height: number): number {
  if (weight <= 0 || height <= 0) {
    throw new Error("Weight and height must be greater than zero.");
  }

  const bmi = weight / (height * height);
  return parseFloat(bmi.toFixed(2));
}
