import Link from "next/link";
import React, { useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { readStyleEnum } from "@/utils/types";
import ChapterImageSelect from "./ChapterImageSelect";
import { ChapterContext } from "@/utils/context/ChapterContext";
import { useRouter } from "next/router";
import { getChapterNumber } from "@/utils/helpers";

const ChapterNavigation = () => {
  const { readingStyle, chapters } = useContext(ChapterContext);
  const router = useRouter();
  const { id, chapter } = router.query;
  const chapterNumb = getChapterNumber(chapter as string);

  const currentIndex = chapters.findIndex((c) => c.capNumber === chapterNumb);

  const existPrev = chapters[currentIndex - 1] ? true : false;
  const existNext = chapters[currentIndex + 1] ? true : false;

  return (
    <section className="flex flex-wrap justify-between mx-auto max-w-7xl items-center px-5 gap-y-3">
      <div className="w-1/2 sm:w-36 pr-1 sm:pr-0">
        {existPrev ? (
          <>
            <Link
              className="flex gap-2 bg-primary bg-hover p-3 px-5 items-center rounded-full justify-center"
              href={`/content/${id}/capitulo-${
                chapters[currentIndex - 1].capNumber
              }`}
            >
              <FaChevronLeft size={18} />
              Anterior
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="w-full sm:w-auto order-1 sm:order-none">
        {readingStyle == readStyleEnum.page && <ChapterImageSelect />}
      </div>

      <div className="w-1/2 sm:w-36 pl-1 sm:pl-0">
        {existNext ? (
          <Link
            className="flex gap-2 bg-primary bg-hover p-3 px-5 items-center rounded-full justify-center"
            href={`/content/${id}/capitulo-${
              chapters[currentIndex + 1].capNumber
            }`}
          >
            Siguiente
            <FaChevronRight size={18} />
          </Link>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default ChapterNavigation;
