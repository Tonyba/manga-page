import { ContentType, GetUserResponseType, LoginResponseType } from "../types";
import { axiosInstance } from "./axiosGlobal";

export const login = (email: string, password: string) =>
  axiosInstance.post<LoginResponseType>("/login", { email, password });

export const register = (email: string, password: string, userName: string) =>
  axiosInstance.post("/register", { email, password, userName });

export const getUserById = (id: number) =>
  axiosInstance.get<GetUserResponseType>(`/getuserid/${id}`);

export const addFavorite = (idContent: number, idUser: number) =>
  axiosInstance.post<ContentType>("/addfavorite", { idContent, idUser });

export const removeFavorite = (idContent: number, idUser: number) =>
  axiosInstance.delete("/deletefavorite", { data: { idContent, idUser } });
