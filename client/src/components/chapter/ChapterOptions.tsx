import { ChapterContext } from "@/utils/context/ChapterContext";
import { readStyleEnum } from "@/utils/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BsFile, BsFiles, BsSearch } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import ChapterSearch from "./ChapterSearch";
import { useScrollDirection } from "@/hooks/useScrollDirection";

const ChapterOptions = () => {
  const { setReadingStyle, readingStyle } = useContext(ChapterContext);
  const [modalOpen, setOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const scrollDirection = useScrollDirection();

  const handleSearchClose = () => setOpen(false);

  return (
    <>
      <div className="flex justify-center">
        <motion.div
          animate={{
            opacity: scrollDirection === "up" ? 1 : 0,
            y: scrollDirection === "up" ? 0 : 100,
          }}
          className="fixed flex divide-x divide-slate-600 bottom-0 sm:bottom-5 px-5  bg-slate-700 rounded-xl"
        >
          <Link
            href={`/content/${id}`}
            className="flex items-center flex-col hover:bg-slate-400 p-2 px-5"
            onClick={() =>
              setReadingStyle(
                readingStyle === readStyleEnum.cascade
                  ? readStyleEnum.page
                  : readStyleEnum.cascade
              )
            }
          >
            <GiHamburgerMenu size={22} className="mb-1" />
            <p>Contenido</p>
          </Link>
          <button
            className="flex items-center flex-col hover:bg-slate-400 p-2 px-5"
            onClick={() =>
              setReadingStyle(
                readingStyle === readStyleEnum.cascade
                  ? readStyleEnum.page
                  : readStyleEnum.cascade
              )
            }
          >
            {readingStyle === readStyleEnum.cascade ? (
              <BsFiles size={22} className="mb-1" />
            ) : (
              <BsFile size={22} className="mb-1" />
            )}

            <p>{readingStyle}</p>
          </button>

          <button
            className="flex items-center flex-col hover:bg-slate-400 p-2 px-5"
            onClick={() => setOpen(true)}
          >
            <BsSearch size={22} className="mb-1" />
            <p>Capitulos</p>
          </button>
        </motion.div>
      </div>
      <ChapterSearch onModalClose={handleSearchClose} isOpen={modalOpen} />
    </>
  );
};

export default ChapterOptions;
