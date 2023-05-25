import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useRouter } from "next/router";
import { useAppContext } from "@/utils/context/AppContext";
import { BsBook } from "react-icons/bs";
import { MdSettings } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "@/hooks/useAuth";
import { RiDashboardLine } from "react-icons/ri";

const iconsSize = 22;

const dashboardItemsList = [
  {
    label: "Panel",
    url: "/dashboard",
    role: "Admin",
    action: undefined,
    Icon: <RiDashboardLine size={iconsSize} />,
  },
  {
    label: "Mangas",
    url: "/dashboard/content",
    role: "Admin",
    action: "content",
    Icon: <BsBook size={iconsSize} />,
  },
  {
    label: "Favoritos",
    url: "/dashboard/favorites",
    role: "Usuario",
    action: "favorites",
    Icon: <FaHeart size={iconsSize} />,
  },
  {
    label: "Configuracion",
    url: "/dashboard/settings",
    role: "Usuario",
    action: "settings",
    Icon: <MdSettings size={iconsSize} />,
  },
];

export const DashboardSidebar = () => {
  const router = useRouter();
  const { action } = router.query;
  const { user } = useAppContext();
  const { closeSession } = useAuth();

  const dashboardItemsListFiltered = dashboardItemsList.filter((item) => {
    if (item.role === "Admin" && user?.role !== "Admin") {
      return;
    }
    return item;
  });

  return (
    <>
      <div className="text-center">
        <Image
          src={
            user?.avatar && user?.avatar !== "https"
              ? user.avatar
              : "/img/user.png"
          }
          alt="user"
          className="rounded-full mx-auto mb-3"
          priority={true}
          width={100}
          height={100}
        />
        <span className="font-semibold">{user?.userName}</span>
      </div>

      <ul className="py-5 divide-y divider-primary">
        {dashboardItemsListFiltered.map((item, i) => {
          return (
            <li
              key={i}
              className={`bg-accent-hover ${
                item.action === action && "bg-primary"
              }  font-medium text-lg`}
            >
              <Link
                className="flex gap-3 p-4 py-3 items-center"
                href={item.url}
              >
                {item.Icon}
                {item.label}
              </Link>
            </li>
          );
        })}
        <li
          className="bg-accent-hover font-medium text-lg flex gap-3 p-4 py-3 items-center cursor-pointer"
          onClick={closeSession}
        >
          <BiLogOut size={iconsSize} /> Cerrar Sesion
        </li>
      </ul>
    </>
  );
};
