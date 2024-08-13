/**
 * Calculates the Body Mass Index (BMI) and categorizes it.
 * @param weight - The weight of the person in kilograms.
 * @param height - The height of the person in meters.
 * @returns An object containing the BMI value and its category.
 * @throws Error if weight or height is invalid.
 */
export function calculateBMI(
  weight: number,
  height: number
): { bmi: number; category: string } {
  if (weight <= 0 || height <= 0) {
    throw new Error("Weight and height must be greater than zero.");
  }

  const bmi = weight / (height * height);
  const roundedBMI = parseFloat(bmi.toFixed(2));

  let category: string;

  if (roundedBMI < 18.5) {
    category = "Underweight";
  } else if (roundedBMI >= 18.5 && roundedBMI < 24.9) {
    category = "Normal weight";
  } else if (roundedBMI >= 25 && roundedBMI < 29.9) {
    category = "Overweight";
  } else {
    category = "Obesity";
  }

  return { bmi: roundedBMI, category };
}
