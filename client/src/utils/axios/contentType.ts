import axios from "axios";
import {
  AddContentParams,
  ContentResponseType,
  ContentType,
  CreateChapterParams,
  DashboardData,
  GetChapterResponse,
} from "../types";
import { axiosInstance } from "./axiosGlobal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMangas = () => axiosInstance.get<ContentType[]>("/manga");

export const getManga = (id: number) =>
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


export const deleteChapter = (id: number) => axiosInstance.delete(`/episode/${id}`);

export const getChapterImages = (episodeId: number, mangaId: string) =>
  axiosInstance.get<GetChapterResponse>(
    `/episode/images?capNumber=${episodeId}&mangaId=${mangaId}`
  );

export const getDashboardData = () =>
  axiosInstance.get<DashboardData>(`/dashboard`);
 
export const addContent = (content: AddContentParams) =>
  axios({
    method: "POST",
    url: `${API_URL}/mangas`,
    data: {
      ...content,
      genres: content.genres.map((g) => g.label),
      demography: content.demography?.label,
      type: content.type?.label,
      status: content.status?.label
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
});

export const updateContent = (content: AddContentParams, id: number) =>
  axios({
    method: "PUT",
    url: `${API_URL}/manga/${id}`,
    data: {
      ...content,
      genres: content.genres.map((g) => g.label),
      demography: content.demography?.label,
      type: content.type?.label,
      status: content.status?.label
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
});

export const deleteManga = (id: number) => axiosInstance.delete(`/manga/${id}`);

export const bulkDelete = (mangas: number[]) => axiosInstance.delete('/manga/bulk/delete', {data: {mangas}});
