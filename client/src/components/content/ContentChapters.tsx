import { ChapterItemType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";

const ContentChapters: FC<ChapterItemType> = ({ text, image, chapter }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="flex items-center gap-3">
      <div className="w-24">
        <Link href={`${id}/${chapter}`}>
          <Image
            alt={text}
            className="object-cover rounded-lg"
            src={image}
            width={200}
            height={150}
          />
        </Link>
      </div>

      <p className="font-semibold">
        <Link href={`${id}/${chapter}`}>{text}</Link>
      </p>
    </div>
  );
};

export default ContentChapters;
