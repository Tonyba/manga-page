import { ContentType } from "@/utils/types";
import React, { FC } from "react";
import Image from "next/image";

const ListItem: FC<ContentType> = ({ title, image }) => {
  return (
    <div className="flex pt-4 items-center">
      <div className="w-1/4">
        <Image
          src={"https://picsum.photos/60/80"}
          width={60}
          height={80}
          alt={title}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="w-3/4 pl-2">
        <div className="line-clamp-1 max-h-6 mb-3">{title}</div>

        <button className="bg-slate-600 hover:bg-slate-500 p-1 px-2 rounded-lg text-sm">
          Capitulo 23
        </button>
      </div>
    </div>
  );
};

export default ListItem;
