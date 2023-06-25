import axios from "axios";
import { RemoveLastDirectoryPartOf } from "../helpers";
import { API_URL } from "../constants";

export const axiosInstance = axios.create({
  baseURL: API_URL?.endsWith("/")
    ? RemoveLastDirectoryPartOf(API_URL)
    : API_URL,
  withCredentials: true,
});
