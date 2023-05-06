import { ContentType } from "@/utils/types";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const ListItem: FC<ContentType> = ({ title, image, id }) => {
  return (
    <div className="flex pt-4 items-center">
      <div className="w-1/4">
        <Link href={`/content/${id}`}>
          <Image
            src={image as string}
            width={60}
            height={80}
            alt={title}
            className="rounded-lg object-cover"
          />
        </Link>
      </div>
      <div className="w-3/4 pl-2">
        <Link href={`/content/${id}`}>
          <h4 className="line-clamp-1 max-h-6 mb-3">{title}</h4>
        </Link>

        <button className="bg-primary bg-hover p-1 px-2 rounded-lg text-sm">
          Capitulo 23
        </button>
      </div>
    </div>
  );
};

export default ListItem;
