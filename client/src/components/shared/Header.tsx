import Link from "next/link";
import React from "react";
import HeaderSearch from "./HeaderSearch";
import Logo from "./Logo";
import { FaDiscord } from "react-icons/fa";

const Header = () => {
  return (
    <header className="max-w-7xl w-full mx-auto col-span-4 flex py-5 justify-between align-middle h-24 px-5 xl:px-0">
      <div className="flex items-center gap-3">
        <Link href={"/"}>
          <Logo />
        </Link>

        <Link href={"/mangas"}>Mangas</Link>
        <Link href={"/explorador"}>Explorador</Link>
      </div>

      <div className="flex align-middle items-center gap-5">
        <HeaderSearch />

        <div className="bg-primary-dark-hover p-3 rounded-full cursor-pointer">
          <FaDiscord size={21} color="white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
