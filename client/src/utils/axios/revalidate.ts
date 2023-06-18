import axios from "axios";
import { NEXT_API_URL } from "../constants";


export const revalidateManga = (id: string) => {
  const path = encodeURIComponent(`content/${id}`);
  return axios.get(`${NEXT_API_URL}/api/revalidate?path=${path}?secret=${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}`);
}

export const revalidateChapter = (mangaId: number, capNumber: number) => {
  const path = encodeURIComponent(`content/${mangaId}/${capNumber}`);
  return axios.get(`${NEXT_API_URL}/api/revalidate?path=${path}?secret=${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}`);
}