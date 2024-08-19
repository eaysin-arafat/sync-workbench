import { FormState } from ".";

export const validateForm = (
  formState: FormState
): { isValid: boolean; errors: FormState } => {
  const errors: FormState = {
    currentPassword: "",
    newPassword: "",
  };

  if (!formState.currentPassword) {
    errors.currentPassword = "Current password is required";
  }

  if (!formState.newPassword) {
    errors.newPassword = "New password is required";
  }

  const isValid = !errors.currentPassword && !errors.newPassword;

  return { isValid, errors };
};
