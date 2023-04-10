import Link from "next/link";
import React, { useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { readStyleEnum } from "@/utils/types";
import ChapterImageSelect from "./ChapterImageSelect";
import { ChapterContext } from "@/utils/context/ChapterContext";
import { useRouter } from "next/router";

const ChapterNavigation = () => {
  const {
    setCurrentImage,
    currentChapter,
    readingStyle,
    currentImage,
    images,
    totalChapters,
  } = useContext(ChapterContext);
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div className="w-36">
        {currentChapter - 1 > 0 ? (
          <>
            <Link
              className="flex gap-2 bg-slate-600 hover:bg-slate-500 p-3 px-5 items-center rounded-full"
              href={`/content/${id}/${currentChapter - 1}`}
            >
              <FaChevronLeft size={18} />
              Anterior
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
      {readingStyle == readStyleEnum.page && <ChapterImageSelect />}

      <div className="w-36">
        {currentChapter + 1 <= totalChapters ? (
          <Link
            className="flex gap-2 bg-slate-600 hover:bg-slate-500 p-3 px-5 items-center rounded-full"
            href={`/content/${id}/${currentChapter + 1}`}
          >
            Siguiente
            <FaChevronRight size={18} />
          </Link>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ChapterNavigation;
