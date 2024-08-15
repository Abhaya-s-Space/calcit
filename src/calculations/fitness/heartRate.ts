/**
 * Calculates the Heart Rate Reserve (HRR) range based on age, resting heart rate, and exercise intensity. Karvonen Formula THR = [(MHR - RHR) x %Intensity] + RHR
 * @param age - The age of the person in years.
 * @param restingHeartRate - The resting heart rate in beats per minute.
 * @param intensity - The intensity of the exercise ("very_light", "light", "moderate", "hard", "very_hard").
 * @returns An object containing the HRR range.
 * @throws Error if age, resting heart rate, or intensity is invalid.
 */
export function calculateHRRRange(
  age: number,
  restingHeartRate: number,
  intensity: "very_light" | "light" | "moderate" | "hard" | "very_hard"
): { hrrMin: number; hrrMax: number } {
  if (age <= 0 || restingHeartRate <= 0) {
    throw new Error("Age and resting heart rate must be greater than zero.");
  }

  if (
    !["very_light", "light", "moderate", "hard", "very_hard"].includes(
      intensity
    )
  ) {
    throw new Error(
      "Intensity must be one of 'very_light', 'light', 'moderate', 'hard', or 'very_hard'."
    );
  }

  // Calculate HR Max using the more accurate formula
  const hrMax = 206.9 - 0.67 * age;

  // Calculate HRR
  const hrr = hrMax - restingHeartRate;

  // Intensity ranges
  const intensityRanges: { [key: string]: [number, number] } = {
    very_light: [0, 0.19],
    light: [0.2, 0.39],
    moderate: [0.4, 0.59],
    hard: [0.6, 0.84],
    very_hard: [0.85, 1.0],
  };

  // Get HRR range based on intensity
  const [hrrMinPercentage, hrrMaxPercentage] = intensityRanges[intensity];

  // Calculate HRR range
  const hrrMin = Math.round(hrr * hrrMinPercentage + restingHeartRate);
  const hrrMax = Math.round(hrr * hrrMaxPercentage + restingHeartRate);

  return { hrrMin, hrrMax };
}
