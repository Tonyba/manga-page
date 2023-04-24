import { StylesConfig } from "react-select/dist/declarations/src/styles";
import { ContentType } from "./types";

export const fileTypes = [".jpg", ".pnh", ".gif", ".webp", ".avif", ".jpeg"];

export const selectStyles: StylesConfig = {
  control: (styles, { isFocused }) => ({
    ...styles,
    background: "rgb(71, 85, 105)",
    cursor: "pointer",
    borderColor: isFocused ? "#60A5FA" : "rgb(100 116 139)",
    "&:hover": {
      borderColor: "#60A5FA",
    },
  }),
  placeholder: (styles) => {
    return {
      ...styles,
      color: "rgba(255,255,255, .5)",
    };
  },
  dropdownIndicator: (styles, { isFocused }) => {
    return {
      ...styles,
      color: isFocused ? "#60A5FA" : "",
      "&:hover": {
        color: "#60A5FA",
      },
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      background: "rgb(71, 85, 105)",
    };
  },
  option: (styles, { isSelected }) => {
    return {
      ...styles,
      color: "white",
      cursor: "pointer",
      backgroundColor: isSelected ? "rgb(100 116 139)" : "rgb(71, 85, 105)",
      "&:hover": {
        backgroundColor: "rgb(100 116 139)",
      },
    };
  },
  input: (styles) => ({
    ...styles,
    color: "white",
  }),
  singleValue: (styles) => ({ ...styles, color: "white" }),
};

export const findFavorite = (
  id: number,
  contentType: string,
  favorites: ContentType[]
) => {
  const favorite = favorites.find(
    (favorite) => favorite.id === id && favorite.type === contentType
  );

  if (favorite) return true;

  return false;
};
