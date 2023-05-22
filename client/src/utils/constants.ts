import { StylesConfig } from "react-select";
import { DashboardData } from "./types";

export const FILE_TYPES = {
  "image/png": [".png"],
  "image/jpge": [".jpeg", ".jpg"],
  "image/webp": [".wepb"],
  "image/gif": [".gif"],
  "image/avif": [".avif"],
};

export const SELECT_STYLES: StylesConfig = {
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

export const INIT_FILTER_STATE = {
  type: "",
  demography: "",
  status: "",
  genres: [],
  limit: 12,
  page: 1,
};

export const VALIDATION_MESSAGES = {
  is_required: "Este campo es requerido",
  valid_email: "Debe ingresar un email valido",
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const INIT_DASHBOARD_DATA:DashboardData = {
  lastAddedChapters: [],
  lastAddedMangas: [],
  mangasCount: 0,
  manhuasCount: 0,
  manhwasCount: 0
}
