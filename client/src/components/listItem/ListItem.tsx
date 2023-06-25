import { ContentType } from "@/utils/types";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import LastEpisodeBtn from "../cardItem/LastEpisodeBtn";

const ListItem: FC<ContentType> = ({ title, image, id, lastChapter }) => {
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
        <LastEpisodeBtn id={id} lastChapter={lastChapter} fullWidth={false} />
      </div>
    </div>
  );
};

export default ListItem;
