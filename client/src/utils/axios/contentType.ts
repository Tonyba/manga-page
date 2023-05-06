import axios from "axios";
import {
  AddContentParams,
  ContentResponseType,
  ContentType,
  CreateChapterParams,
} from "../types";
import { axiosInstance } from "./axiosGlobal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMangas = () => axiosInstance.get<ContentType[]>("/manga");

export const getManga = (id: string) =>
  axiosInstance.get<ContentResponseType>(`/manga/${id}`);

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
  axiosInstance.get(`/episode/images?title=${title}&episode=${episode}`);

export const addContent = (content: AddContentParams) =>
  axios({
    method: "POST",
    url: `${API_URL}/mangas`,
    data: content,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
