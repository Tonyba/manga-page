import React, { createContext } from "react";
import { ContentType, FiltersType } from "../types";

type ExploradorContextType = {
  content: ContentType[];
  setContent: (content: ContentType[]) => void;
  filters?: FiltersType | {};
  setFilters: (filters: FiltersType) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setCount: (count: number) => void;
};

export const ExploradorContext = createContext<ExploradorContextType>({
  content: [],
  setContent: () => {},
  filters: {},
  loading: true,
  setCount: () => {},
  setFilters: () => {},
  setLoading: () => {},
});
