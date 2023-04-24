import { ContentValidationType, AddContentParams } from "../types";

export const ValidateContent = (values: AddContentParams) => {
  const requerido = "Este campo es requerido";
  let errors: ContentValidationType = {};

  if (!values.title) {
    errors.title = requerido;
  }

  if (!values.description) {
    errors.description = requerido;
  }

  if (!values.banner) {
    errors.banner = requerido;
  }

  if (!values.image) {
    errors.image = requerido;
  }

  if (values.genres.length === 0) {
    errors.genres = "debe tener al menos un genero";
  }

  return errors;
};
