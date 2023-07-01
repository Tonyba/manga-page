import { ContentType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import ContentPill from "./ContentPill";


const ContentSearchItem: FC<ContentType> = ({
  id,
  description,
  title,
  image,
  type,
}) => {
  return (
    <div className="flex gap-3">
      <div className="w-1/4">
        <Link href={`/content/${id}`}>
          <Image
            src={image as string}
            alt={title}
            priority={true}
            className="rounded-md h-28 object-cover"
            width={100}
            height={100}
          />
        </Link>
      </div>
      <div className="w-3/4">
        <Link href={`/content/${id}`} className="font-semibold line-clamp-2">
          {title}
        </Link>
        <div className="my-1">
          <ContentPill contentType={type} isAbsolute={false} full={false} />
        </div>

        <p className="text-sm line-clamp-4">{description}</p>
      </div>
    </div>
  );
};

export default ContentSearchItem;
