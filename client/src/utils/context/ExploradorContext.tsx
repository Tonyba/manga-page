import React, { createContext } from "react";
import { ContentType } from "../types";

type ExploradorContextType = {
  content: ContentType[];
  setContent: (content: ContentType[]) => void;
};

export const ExploradorContext = createContext<ExploradorContextType>({
  content: [],
  setContent: () => {},
});
