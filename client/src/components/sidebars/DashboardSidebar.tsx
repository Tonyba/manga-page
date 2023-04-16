import Image from "next/image";
import Link from "next/link";
import React from "react";

import { RiDashboardLine } from "react-icons/ri";
import { BsBook } from "react-icons/bs";
import { MdSettings } from "react-icons/md";

export const DashboardSidebar = () => {
  const iconsSize = 22;

  return (
    <div className="">
      <Image
        src="/img/user.png"
        alt="user"
        className="rounded-full mx-auto"
        priority={true}
        width={100}
        height={100}
      />

      <ul className="py-5">
        <li className="bg-accent-hover font-medium text-lg">
          <Link
            className="flex gap-3 p-4 py-3 items-center"
            href={"/dashboard"}
          >
            <RiDashboardLine size={iconsSize} />
            Panel
          </Link>
        </li>
        <li className="bg-accent-hover font-medium text-lg">
          <Link
            className="flex gap-3 p-4 py-3 items-center"
            href={"/dashboard/content"}
          >
            <BsBook size={iconsSize} />
            Mangas
          </Link>
        </li>
        <li className="bg-accent-hover font-medium text-lg">
          <Link
            className="flex gap-3 p-4 py-3 items-center"
            href={"/dashboard/settings"}
          >
            <MdSettings size={iconsSize} />
            Configuracion
          </Link>
        </li>
      </ul>
    </div>
  );
};
