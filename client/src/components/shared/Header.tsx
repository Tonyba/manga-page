import Link from "next/link";
import React from "react";
import HeaderSearch from "./HeaderSearch";
import Logo from "./Logo";
import { FaDiscord } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <div className="text-white col-span-4 flex py-5 justify-between align-middle  h-24">
        <div className="text-white flex items-center gap-3">
          <Logo />

          <Link className="text-white" href={"/mangas"}>
            Mangas
          </Link>
        </div>

        <div className="flex align-middle items-center gap-5">
          <HeaderSearch />

          <div className="hover:bg-slate-700 p-3 rounded-full cursor-pointer">
            <FaDiscord size={21} color="white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
