import axios from "axios";
import { AddContentParams, ContentResponseType, ContentType } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMangas = () => axios.get<ContentType[]>(`${API_URL}/manga`);

export const getManga = (id: string) =>
  axios.get<ContentResponseType>(`${API_URL}/manga/${id}`);

export const addContent = (content: AddContentParams) =>
  axios({
    method: "POST",
    url: `${API_URL}/mangas`,
    data: content,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
