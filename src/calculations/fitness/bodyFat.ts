/**
 * Calculates the Body Fat Percentage using the U.S. Navy Method.
 * @param gender - The gender of the person ("male" or "female").
 * @param weight - The weight of the person in kilograms.
 * @param height - The height of the person in centimeters.
 * @param neck - The neck circumference in centimeters.
 * @param waist - The waist circumference in centimeters.
 * @param hips - The hip circumference in centimeters (required for females).
 * @returns The estimated body fat percentage.
 * @throws Error if any parameter is invalid or if hips are missing for females.
 */
export function calculateBodyFatPercentage(
  gender: "male" | "female",
  weight: number,
  height: number,
  neck: number,
  waist: number,
  hips?: number
): number {
  if (
    weight <= 0 ||
    height <= 0 ||
    neck <= 0 ||
    waist <= 0 ||
    (gender === "female" && (!hips || hips <= 0))
  ) {
    throw new Error(
      "All measurements must be greater than zero, and hips must be provided for females."
    );
  }

  let bodyFatPercentage: number;

  if (gender === "male") {
    // Body fat percentage formula for males
    bodyFatPercentage =
      495 /
        (1.0324 -
          0.19077 * Math.log10(waist - neck) +
          0.15456 * Math.log10(height)) -
      450;
  } else {
    // Body fat percentage formula for females
    bodyFatPercentage =
      495 /
        (1.29579 -
          0.35004 * Math.log10(waist + hips! - neck) +
          0.221 * Math.log10(height)) -
      450;
  }

  return parseFloat(bodyFatPercentage.toFixed(2));
}
