type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

export const validateStep = (
  currentStep: number,
  steps: any[],
  optionalFields: { [key: string]: string[] }
): ValidationResult => {
  if (currentStep === steps?.length) return { isValid: true, errors: [] };

  const currentFormData = steps[currentStep - 1]?.props?.formData;
  const currentFormDataKeys = Object.keys(currentFormData);
  const optionalFieldsForStep =
    optionalFields[steps[currentStep - 1].type.name] || [];

  let requiredFields;
  if (currentFormDataKeys) {
    requiredFields = currentFormDataKeys?.filter(
      (key) => !optionalFieldsForStep?.includes(key)
    );
  }

  let isValid = true;
  let errors: string[] = [];
  if (requiredFields)
    for (const key of requiredFields) {
      if (currentFormData[key] === "" || currentFormData[key] === null) {
        isValid = false;
        errors.push(`Field ${key} is required.`);
      }
    }

  // Additional validation for re-entered fields
  const reEnterFields = {
    UAN_Number: "Re_enter_UAN_Number",
    PAN_Number: "Re_enter_PAN_Number",
    Aadhar_Number: "Re_enter_Aadhar_Number",
    Passport_Number: "Re_enter_Passport_Number",
  };

  for (const [original, reEnter] of Object.entries(reEnterFields)) {
    if (
      currentFormData.hasOwnProperty(original) &&
      currentFormData.hasOwnProperty(reEnter) &&
      currentFormData[original] !== currentFormData[reEnter]
    ) {
      isValid = false;
      errors.push(`Re-entered field ${original} does not match.`);
      break;
    }
  }

  return { isValid, errors };
};
