/**
 * Calculates the One Rep Max (1RM) using the Epley formula, with exercise-specific considerations.
 * @param weight - The weight lifted in kilograms.
 * @param reps - The number of repetitions performed with that weight.
 * @param exercise - The type of exercise ("squat", "deadlift", "bench_press", or "generic").
 * @returns The estimated one rep max value for the specified exercise.
 * @throws Error if weight, reps, or exercise type is invalid.
 */
export function calculateOneRepMax(
  weight: number,
  reps: number,
  exercise: "squat" | "deadlift" | "bench_press" | "generic" = "generic"
): number {
  if (weight <= 0 || reps <= 0) {
    throw new Error("Weight and repetitions must be greater than zero.");
  }

  // Adjust the multiplier for different exercises
  let multiplier: number;

  switch (exercise) {
    case "squat":
      multiplier = 1 + reps / 33.33;
      break;
    case "deadlift":
      multiplier = 1 + reps / 30;
      break;
    case "bench_press":
      multiplier = 1 + reps / 40;
      break;
    case "generic":
    default:
      multiplier = 1 + reps / 30;
      break;
  }

  // Epley formula for estimating 1RM with exercise-specific multiplier
  const oneRepMax = weight * multiplier;
  const rounded1RM = parseFloat(oneRepMax.toFixed(2));

  return rounded1RM;
}
