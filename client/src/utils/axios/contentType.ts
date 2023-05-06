import axios from "axios";
import {
  AddContentParams,
  ContentResponseType,
  ContentType,
  CreateChapterParams,
} from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMangas = () => axios.get<ContentType[]>(`${API_URL}/manga`);

export const getManga = (id: string) =>
  axios.get<ContentResponseType>(`${API_URL}/manga/${id}`);

export const addChapter = (params: CreateChapterParams) =>
  axios({
    method: "POST",
    url: `${API_URL}/episodes`,
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getChapterImages = (title: string, episode: string) =>
  axios.get(`${API_URL}/episode/images?title=${title}&episode=${episode}`);

export const addContent = (content: AddContentParams) =>
  axios({
    method: "POST",
    url: `${API_URL}/mangas`,
    data: content,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
