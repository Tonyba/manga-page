import { LoginRegisterParams, LoginRegisterValidation } from "../types";

const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const validateUser = (
  values: LoginRegisterParams,
  variant: "login" | "register"
) => {
  let errors: LoginRegisterValidation = {};
  const isEmail = "Debe ser un email valido";
  const required = "Este campo es Requerido";
  const isSame = "Las contraseñas deben ser iguales";

  if (!values.email.trim() || !regexEmail.test(values.email)) {
    errors.email = isEmail;
  }

  if (!values.password) {
    errors.password = required;
  }

  if (variant === "register" && !values.userName?.trim()) {
    errors.userName = required;
  }

  if (variant === "register" && !values.confirmPassword?.trim()) {
    errors.confirmPassword = required;
  }

  if (variant === "register" && values.password !== values.confirmPassword) {
    errors.confirmPassword = isSame;
  }

  return errors;
};
