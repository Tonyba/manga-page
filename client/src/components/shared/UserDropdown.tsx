import { useAuth } from "@/hooks/useAuth";
import { useAppContext } from "@/utils/context/AppContext";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const dropDownOptions = [
  {
    label: "Favoritos",
    role: "link",
    url: "/dashboard/favorites",
  },
  {
    label: "Configuracion",
    role: "link",
    url: "/dashboard/settings",
  },
  {
    label: "Cerrar Sesion",
    role: "button",
  },
];

const UserDropdown = () => {
  const { setToken } = useAuth();
  const { setUser, user } = useAppContext();
  const router = useRouter();

  const closeSession = () => {
    localStorage.removeItem("token");
    deleteCookie("x-token");
    setToken(null);
    setUser(undefined);
    if (router.asPath.includes("/dashboard")) router.replace("/");
  };

  return (
    <div
      className="grid-cols-1 
    divide-y divider-dark bg-primary 
    rounded-md z-10 min-w-max
    absolute overflow-hidden invisible
    duration-300 transform
    opacity-0
    -translate-y-1
    -translate-x-3
    group-hover:overflow-visible
    group-hover:visible
    group-hover:translate-y-2
    group-hover:opacity-100
    "
    >
      {dropDownOptions.map((opt, i) => {
        return opt.role === "link" ? (
          <Link
            href={opt.url!}
            key={i}
            className="px-5 block py-3 bg-primary-dark-hover w-full"
          >
            {opt.label}
          </Link>
        ) : (
          <button
            key={i}
            onClick={closeSession}
            className="px-5 block py-3 bg-primary-dark-hover w-full"
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default UserDropdown;
