import { ImageModule } from "@faker-js/faker";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";

export type ContentType = {
  id: number;
  title: string;
  image: string | ImageModule;
  description: string;
  type: string;
  demography: string;
  genres: string[];
  status: string;
  Episodes: ChapterItemType[];
  banner: string;
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

export type DragImageItemType = {
  id: string;
  file: File;
  imgSrc: string;
  pag: number;
};

export type CreateChapterParams = {
  episode: string;
  mangaId: number;
  capNumber: number;
  images: File[];
};

export type TabItemType = {
  label: string;
  content?: React.ReactNode;
};

export type AddContentParams = {
  title: string;
  description: string;
  type: string;
  demography: string;
  genres: any[];
  status: string;
  banner: File | string;
  image: File | string;
};

export type ContentValidationType = Partial<{
  title: string;
  description: string;
  type: string;
  demography: string;
  genres: string[] | string;
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
  numEpisodes: number;
};

export type ChapterItemType = {
  image: string;
  title: string;
  id: number;
  path: string;
  capNumber: string;
  mangaId: number;
};

export enum readStyleEnum {
  cascade = "Cascada",
  page = "Paginado",
}

export type OptionType = {
  value: string;
  label: string;
};

export type ChapterPageParamsType = {
  content: ContentResponseType;
  currentChapterImgs: string[];
};
