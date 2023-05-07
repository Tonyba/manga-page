import { createContext } from "react";
import { ContentType, User } from "../types";

type AuthContextType = {
  user?: User;
  setUser: (user?: User) => void;
  favorites: ContentType[];
  setFavorites: (favorites: ContentType[]) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  favorites: [],
  setFavorites: () => {},
  setUser: () => {},
});
