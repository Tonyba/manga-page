import { ChapterValidationType, CreateChapterParams } from "../types";

export const validateChapter = (values: CreateChapterParams) => {
  const REQUIRED = "este campo es requerido";
  let errors: ChapterValidationType = {};

  if (!values.capNumber || values.capNumber <= 0) {
    errors.capNumber = "no puede estar vacio o ser igual o menor que 0";
  }

  if (values.images?.length === 0) {
    errors.images = REQUIRED;
  }

  return errors;
};
