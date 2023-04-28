import React, { createContext } from "react";
import { ChapterItemType, readStyleEnum } from "../types";

type ChapterContextType = {
  images: string[];
  currentChapter?: ChapterItemType;
  contentTitle: string;
  chapters: ChapterItemType[];
  setCurrentChapter: (chapter: string) => void;
  setCurrentImage: (img: number) => void;
  setReadingStyle: (style: readStyleEnum) => void;
  currentImage: number;
  readingStyle: readStyleEnum;
};

export const ChapterContext = createContext<ChapterContextType>({
  images: [],
  currentChapter: undefined,
  contentTitle: "",
  chapters: [],
  setCurrentChapter: () => {},
  setCurrentImage: () => {},
  setReadingStyle: () => {},
  currentImage: 0,
  readingStyle: readStyleEnum.page,
});
