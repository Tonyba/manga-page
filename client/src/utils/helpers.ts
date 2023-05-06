import { StylesConfig } from "react-select/dist/declarations/src/styles";
import { ContentType } from "./types";
export const fileTypes = {
  "image/png": [".png"],
  "image/jpge": [".jpeg", ".jpg"],
  "image/webp": [".wepb"],
  "image/gif": [".gif"],
  "image/avif": [".avif"],
};

export const RemoveLastDirectoryPartOf = (the_url: string) => {
  var the_arr = the_url.split("/");
  the_arr.pop();
  return the_arr.join("/");
};

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

export const initFilterState = {
  type: "Manga",
  demography: "",
  status: "",
  genres: [],
  limit: 12,
  page: 1,
};

export const toSlug = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\W_]+/g, "-")
    .toLowerCase()
    .replace(/^-+|-+$/g, "");
};

export const getChapterNumber = (txt: string) => {
  const newTxt = txt.split("-")[1];
  return parseInt(newTxt);
};
