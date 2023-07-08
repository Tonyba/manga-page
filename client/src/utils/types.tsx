import { ImageModule } from "@faker-js/faker";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";

export type ContentType = {
  id: number;
  title: string;
  image: string | ImageModule | File;
  description: string;
  type: "Manga" | "Manhwa" | "Manhua";
  demography: string;
  genres: string[];
  status: string;
  episodes: ChapterItemType[];
  numEpisodes: number;
  banner: string;
  lastChapter?: number;
  checked?: boolean;
};

export type User = {
  id: number;
  email: string;
  userName: string;
  role: "Usuario" | "Admin";
  paypal?: string;
  avatar?: string;
  favorites: ContentType[];
};

export type GetUserResponseType = {
  user: User;
  favorites: ContentType[];
};

export type LoginResponseType = {
  token: string;
};

export type LoginRegisterParams = {
  email: string;
  password: string;
  confirmPassword?: string;
  userName?: string;
  avatar?: string;
  paypal?: string;
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type FiltersType = {
  type: string;
  demography: string;
  status: string;
  genres: string[];
  limit: number;
  page: number;
};

export type CreateChapterParams = {
  episode: string;
  mangaId: number;
  capNumber: number;
  images: File[] | ImageType[];
};

export type TabItemType = {
  label: string;
  content?: React.ReactNode;
};

export type AddContentParams = {
  title: string;
  description: string;
  type?: OptionType;
  demography?: OptionType;
  genres: OptionType[];
  status?: OptionType;
  banner: File | string | ImageType;
  image: File | string | ImageType;
};

export type ContentValidationType = Partial<{
  title: string;
  description: string;
  type: string;
  demography: string;
  genres: string;
  status: string;
  banner: File | string;
  image: File | string;
}>;

export type ChapterValidationType = Partial<{
  episode: string;
  mangaId: string;
  capNumber: string;
  images: string;
}>;

export type FiltersResponseType = {
  result: ContentType[];
  count: number;
};

export type ContentResponseType = {
  manga: ContentType;
};

export type ChapterItemType = {
  title: string;
  id: number;
  path: string;
  capNumber: number;
  mangaId: number;
  Manga?: ContentType;
  image?: string;
  checked?: boolean;
  images?: string[] | ImageType[];
};

export type ImageType = {
  id: number | string;
  name: string;
  position: number;
  url: string;
  file?: File;
  path?: string;
};

export type LoginRegisterValidation = Partial<{
  userName: string;
  password: string;
  confirmPassword: string;
  email: string;
}>;

export enum readStyleEnum {
  cascade = "Cascada",
  page = "Paginado",
}

export type OptionType = {
  value: string;
  label: string;
};

export type UserEditParams = {
  avatar?: File | string | ImageType;
  userName: string;
  email: string;
};

export type UserEditValidation = Partial<{
  userName: string;
  email: string;
}>;

export type DashboardData = {
  mangasCount: number;
  manhuasCount: number;
  manhwasCount: number;
  lastAddedChapters: ChapterItemType[];
  lastAddedMangas: ContentType[];
};

export type GetChapterResponse = {
  images: ImageType[];
  manga: ContentType;
};
