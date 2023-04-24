import Image from "next/image";
import Link from "next/link";
import React from "react";

import { RiDashboardLine } from "react-icons/ri";
import { BsBook } from "react-icons/bs";
import { MdSettings } from "react-icons/md";
import { useRouter } from "next/router";

export const DashboardSidebar = () => {
  const iconsSize = 22;
  const router = useRouter();
  const { action } = router.query;

  return (
    <>
      <div className="text-center">
        <Image
          src="/img/user.png"
          alt="user"
          className="rounded-full mx-auto mb-3"
          priority={true}
          width={100}
          height={100}
        />
        <span className="font-semibold">Fulano de tal</span>
      </div>

      <ul className="py-5">
        <li
          className={`bg-accent-hover ${
            !action && "bg-primary"
          }  font-medium text-lg`}
        >
          <Link
            className="flex gap-3 p-4 py-3 items-center"
            href={"/dashboard"}
          >
            <RiDashboardLine size={iconsSize} />
            Panel
          </Link>
        </li>
        <li
          className={`bg-accent-hover ${
            action === "content" && "bg-primary"
          } font-medium text-lg`}
        >
          <Link
            className="flex gap-3 p-4 py-3 items-center"
            href={"/dashboard/content"}
          >
            <BsBook size={iconsSize} />
            Mangas
          </Link>
        </li>
        <li
          className={`bg-accent-hover ${
            action === "settings" && "bg-primary"
          } font-medium text-lg`}
        >
          <Link
            className="flex gap-3 p-4 py-3 items-center"
            href={"/dashboard/settings"}
          >
            <MdSettings size={iconsSize} />
            Configuracion
          </Link>
        </li>
      </ul>
    </>
  );
};
