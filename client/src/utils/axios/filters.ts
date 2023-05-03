import axios from "axios";
import { ContentType, FiltersResponseType, FiltersType } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const filterExp = (dato: FiltersType) => {
  const data = axios.get<FiltersResponseType>(
    `${API_URL}/filter?genres=${dato.genres}&limit=${dato.limit}&page=${dato.page}=&type=${dato.type}&demography=${dato.demography}&status=${dato.status}`
  );

  return data;
};

export const searchByTitle = (txt: string) =>
  axios.get<FiltersResponseType>(`${API_URL}/filter/title?title=${txt}`);

}