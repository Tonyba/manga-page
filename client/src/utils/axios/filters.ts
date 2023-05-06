import { FiltersResponseType, FiltersType } from "../types";
import { axiosInstance } from "./axiosGlobal";

export const filterExp = (dato: FiltersType) => {
  const data = axiosInstance.get<FiltersResponseType>(
    `/filter?genres=${dato.genres}&limit=${dato.limit}&page=${dato.page}=&type=${dato.type}&demography=${dato.demography}&status=${dato.status}`
  );

  return data;
};

export const searchByTitle = (txt: string) =>
  axiosInstance.get<FiltersResponseType>(`/filter/title?title=${txt}`);
