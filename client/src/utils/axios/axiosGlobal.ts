import axios from "axios";
import { RemoveLastDirectoryPartOf } from "../helpers";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL?.endsWith("/")
    ? RemoveLastDirectoryPartOf(API_URL)
    : API_URL,
});
