import React, { createContext } from "react";
import { ImageType } from "../types";

type AddChapterContextType = {
  onRemoveImage: (index: number) => void;
  setFileItems: (items: ImageType[]) => void;
  fileItems: ImageType[];
};

export const AddChapterContext = createContext<AddChapterContextType>({
  onRemoveImage: () => {},
  setFileItems: () => {},
  fileItems: [],
});
