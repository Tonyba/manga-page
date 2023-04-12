import Link from "next/link";
import React, { FC } from "react";
import ContentPill from "../content/ContentPill";

type Props = {
  title: string;
  type: string;
  desc: string;
  id: number;
};

const CardItemHover: FC<Props> = ({ title, type, desc, id }) => {
  return (
    <div
      className="text-left bg-gray-700 rounded-lg p-5 
    top-0 left-full z-20 duration-200
    lg:block
    hidden
    absolute 
    transition-opacity
    opacity-0 invisible group-hover:visible
    group-hover:opacity-100 
    w-64
    "
    >
      <Link href={`/content/${id}`}>
        <strong className="block mb-2">{title}</strong>
      </Link>

      <ContentPill contentType={type} isAbsolute={false} full={true} />
      <p className="text-sm my-3 line-clamp-[10]">{desc}</p>

      <button className="mb-5 font-medium w-full text-sm py-1 bg-slate-600 hover:bg-slate-500 text-center rounded-md">
        Capitulo 23
      </button>

      <div className="text-right">
        <Link
          href={`/content/${id}`}
          className={`uppercase tracking-wide 
        inline-block
        rounded-md px-3 p-1 bg-red-500 ${type.toLowerCase()} font-semibold text-sm`}
          role="button"
        >
          VER {type}
        </Link>
      </div>
    </div>
  );
};

export default CardItemHover;
