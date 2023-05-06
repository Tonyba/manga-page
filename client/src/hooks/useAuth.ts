import { useAppContext } from "@/utils/context/AppContext";
import { User } from "@/utils/types";
import jwt_decode from "jwt-decode";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { setCookie, deleteCookie } from "cookies-next";
import { getUserById } from "@/utils/axios/user";

export const useAuth = (): {
  user?: User;
  setToken: Dispatch<SetStateAction<string | null | undefined>>;
  loading: boolean;
} => {
  const controller = new AbortController();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>();
  const [user, setUser] = useState<User>();
  const authContext = useAppContext();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    console.log("pasa");
    if (token) {
      const decoded: any = jwt_decode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        deleteCookie("x-token");
      }
      console.log(decoded, "decoded");
      getUserById(decoded.id)
        .then((res) => {
          const data = res.data;
          setCookie("x-token", token);
          setUser(data?.user);
          authContext?.setUser(data?.user!);
          authContext?.setFavorites(data?.favorites || []);
          setTimeout(() => setLoading(false), 700);
        })
        .catch((err) => {
          setTimeout(() => setLoading(false), 700);
        });
    } else {
      setUser(undefined);
    }

    return () => {
      controller.abort();
    };
  }, [token]);

  return { user, setToken, loading };
};
