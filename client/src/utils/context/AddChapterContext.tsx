import React, { createContext } from "react";
import { DragImageItemType } from "../types";

type AddChapterContextType = {
  onRemoveImage: (index: number) => void;
  onImageReOrder: (index: number, toIndex: number) => void;
  setPreviews: (imgs: string[]) => void;
  previews: string[];
  files: File[];
  setFiles: (files: File[]) => void;
  setFileItems: (items: DragImageItemType[]) => void;
  fileItems: DragImageItemType[];
};

export const AddChapterContext = createContext<AddChapterContextType>({
  onRemoveImage: () => {},
  onImageReOrder: () => {},
  setPreviews: () => {},
  setFiles: () => {},
  setFileItems: () => {},
  previews: [],
  files: [],
  fileItems: []
});
