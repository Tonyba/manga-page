import Link from "next/link";
import React, { useState } from "react";
import HeaderSearch from "./HeaderSearch";
import Logo from "./Logo";
import { FaDiscord } from "react-icons/fa";
import { ContentType } from "@/utils/types";
import HeaderUser from "./HeaderUser";
import { useRouter } from "next/router";
import { HEADER_MENU_ITEMS } from "@/utils/constants";
import HeaderMobileMenu from "./HeaderMobileMenu";

const Header = () => {
  const [data, setData] = useState<ContentType[]>([]);

  const router = useRouter();

  const onChange = (items: ContentType[]) => {
    setData(items);
  };

  return (
    <header
      className={`${
        router.asPath.includes("dashboard")
          ? "xl:ml-auto max-w-6xl 2xl:pl-[284px] pl-5 pr-5 xl:pl-48 2xl:max-w-full xl:pr-10 2xl:pr-6"
          : "mx-auto max-w-7xl  px-5 2xl:px-0"
      } w-full col-span-4 flex py-5 justify-between align-middle h-24 `}
    >
      <div className="flex items-center gap-3">
        <Logo />

        {HEADER_MENU_ITEMS.map((item) => (
          <Link className="hidden xl:block" key={item.label} href={item.link}>
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex align-middle items-center gap-5">
        <HeaderSearch
          type="mangas"
          onChange={(items) => {
            const content = [...items] as ContentType[];
            onChange(content);
          }}
          data={data}
        />

        <HeaderUser />

        <div className="bg-primary-dark bg-primary-dark-hover p-3 rounded-full cursor-pointer hidden xl:block">
          <FaDiscord size={21} color="white" />
        </div>

        <HeaderMobileMenu />
      </div>
    </header>
  );
};

export default Header;
