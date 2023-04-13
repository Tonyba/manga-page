import { ImageModule } from "@faker-js/faker";

export type ContentType = {
  id: number;
  title: string;
  image: string | ImageModule;
  description: string;
  contentType: string;
  demography: string;
  genres: string[];
  status: string;
  chapters: ChapterItemType[];
};

export type TabItemType = {
  label: string;
  content?: React.ReactNode;
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
