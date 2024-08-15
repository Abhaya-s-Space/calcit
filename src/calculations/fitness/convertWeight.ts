/**
 * Converts weight between kilograms and pounds.
 * @param weight - The weight to convert.
 * @param unit - The unit of the input weight ("kg" for kilograms, "lb" for pounds).
 * @returns The converted weight in the opposite unit.
 * @throws Error if the weight is less than or equal to zero or if the unit is invalid.
 */
export function convertWeight(weight: number, unit: "kg" | "lb"): number {
  if (weight <= 0) {
    throw new Error("Weight must be greater than zero.");
  }

  let convertedWeight: number;

  if (unit === "lb") {
    // Convert from kilograms to pounds
    convertedWeight = weight * 2.20462;
  } else if (unit === "kg") {
    // Convert from pounds to kilograms
    convertedWeight = weight / 2.20462;
  } else {
    throw new Error("Invalid unit. Use 'kg' for kilograms or 'lb' for pounds.");
  }

  return parseFloat(convertedWeight.toFixed(2));
}
