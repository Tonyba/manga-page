import React, { createContext } from "react";

type AddChapterContextType = {
  onRemoveImage: (index: number) => void;
  onImageReOrder: (index: number, toIndex: number) => void;
  setPreviews: (imgs: string[]) => void;
  previews: string[];
  files: File[];
  setFiles: (files: File[]) => void;
};

export const AddChapterContext = createContext<AddChapterContextType>({
  onRemoveImage: () => {},
  onImageReOrder: () => {},
  setPreviews: () => {},
  setFiles: () => {},
  previews: [],
  files: [],
});
