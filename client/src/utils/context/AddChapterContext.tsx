import React, { createContext } from "react";
import { DragImageItemType } from "../types";

type AddChapterContextType = {
  onRemoveImage: (index: number) => void;
  setFileItems: (items: DragImageItemType[]) => void;
  fileItems: DragImageItemType[];
};

export const AddChapterContext = createContext<AddChapterContextType>({
  onRemoveImage: () => {},
  setFileItems: () => {},
  fileItems: [],
});
