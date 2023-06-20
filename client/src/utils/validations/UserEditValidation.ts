import { EMAIL_REGEX, VALIDATION_MESSAGES } from "../constants";
import { UserEditParams, UserEditValidation } from "../types";

export const validateUserEdit = (data: UserEditParams): UserEditValidation => {
  let errors: UserEditValidation = {};

  if (!data?.userName.trim()) {
    errors.userName = VALIDATION_MESSAGES.is_required;
  }

  if (!data?.email.trim() || !EMAIL_REGEX.test(data.email)) {
    errors.email = VALIDATION_MESSAGES.valid_email;
  }

  return errors;
};
