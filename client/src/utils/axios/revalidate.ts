import axios from "axios";
import { NEXT_API_URL } from "../constants";


export const revalidate = (path: string) => {
  if (process.env.NODE_ENV === "development") return;
  return axios.get(
    `${NEXT_API_URL}/api/revalidate/?path=${path}?secret=${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}`
  );
};
