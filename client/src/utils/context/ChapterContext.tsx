import React, { createContext } from "react";
import { readStyleEnum } from "../types";

type ChapterContextType = {
  images: string[];
  currentChapter: number;
  contentTitle: string;
  totalChapters: number;
  setCurrentChapter: (chapter: number) => void;
  setCurrentImage: (img: number) => void;
  setReadingStyle: (style: readStyleEnum) => void;
  currentImage: number;
  readingStyle: readStyleEnum;
};

export const ChapterContext = createContext<ChapterContextType>({
  images: [],
  currentChapter: 0,
  contentTitle: "",
  totalChapters: 0,
  setCurrentChapter: () => {},
  setCurrentImage: () => {},
  setReadingStyle: () => {},
  currentImage: 0,
  readingStyle: readStyleEnum.page,
});
