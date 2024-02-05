namespace App {
  // Project Type/Class

  // validation
  export interface Validateable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number; // the value
    max?: number; // the value
  }

  export function validate(validateableInput: Validateable): boolean {
    let isValid = true;
    const { value, required, minLength, maxLength, min, max } =
      validateableInput;
    if (validateableInput.required) {
      isValid = isValid && value.toString().trim().length !== 0;
    }
    if (minLength != null && typeof value === "string") {
      isValid = isValid && value.length >= minLength;
    }
    if (maxLength != null && typeof value === "string") {
      isValid = isValid && value.length <= maxLength;
    }
    if (min != null && typeof value === "number") {
      isValid = isValid && value >= min;
    }
    if (max != null && typeof value === "number") {
      isValid = isValid && value <= max;
    }
    return isValid;
  }
}
