import { toSlug } from "@/utils/helpers";
import { ChapterItemType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const ContentChapters: FC<ChapterItemType> = ({
  title,
  image,
  id,
  mangaId,
  capNumber,
}) => {
  const url = toSlug(title);

  return (
    <div className="flex items-center gap-3">
      <div className="w-24">
        <Link href={`/content/${mangaId}/capitulo-${capNumber}`}>
          <Image
            alt={title}
            className="object-cover rounded-lg"
            src={"https://picsum.photos/200/150"}
            width={200}
            height={150}
          />
        </Link>
      </div>

      <Link
        href={`/content/${mangaId}/capitulo-${capNumber}`}
        className="capitalize cursor-pointer"
      >
        {title}
      </Link>
    </div>
  );
};

export default ContentChapters;
