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
};


export type DragImageItemType = {
  id: string;
  file: File;
}

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

export type ContentResponseType = {
  manga: ContentType;
  numEpisodes: number;
};

export type ChapterItemType = {
  image: string;
  text: string;
  chapter: string;
  contentId: number;
};

export enum readStyleEnum {
  cascade = "Cascada",
  page = "Paginado",
}

export type OptionType = {
  value: string;
  label: string;
};
