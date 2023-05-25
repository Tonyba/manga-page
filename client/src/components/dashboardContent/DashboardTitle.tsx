import Link from "next/link";
import React, { FC } from "react";
import { FaTimes } from "react-icons/fa";

type Props = {
  text: string;
  buttonLink?: string;
};

const DashboardTitle: FC<Props> = ({ text }) => {
  return (
    <div className="flex items-center gap-3 mb-5">
      <Link
        href={"/dashboard/content"}
        role="button"
        className="bg-primary bg-primary-dark-hover rounded-full p-3"
      >
        <FaTimes size={25} />
      </Link>
      <h1 className="font-semibold text-2xl md:text-3xl">{text}</h1>
    </div>
  );
};

export default DashboardTitle;
