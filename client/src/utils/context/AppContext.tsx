import { PropsWithChildren, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { ContentType, User } from "../types";

export function AppWrapper({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User>();
  const [favorites, setFavorites] = useState<ContentType[]>([]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AuthContext);
}
