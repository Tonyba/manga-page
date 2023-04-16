import axios, { AxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMangas = () => axios.get(`${API_URL}/mangas`);
