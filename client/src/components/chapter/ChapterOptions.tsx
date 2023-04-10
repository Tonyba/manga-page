import { ChapterContext } from "@/utils/context/ChapterContext";
import { readStyleEnum } from "@/utils/types";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { BsFile, BsFiles } from "react-icons/bs";

const Option = [{}];

const ChapterOptions = () => {
  const { setReadingStyle, readingStyle } = useContext(ChapterContext);
  const [isScrollUp, setScroll] = useState<boolean>(false);

  useEffect(() => {
    const scrollElem = document.body;
    scrollElem.addEventListener("wheel", (e: WheelEvent) => {
      if (e.deltaY > 0) {
        setScroll(false);
      } else {
        setScroll(true);
      }
    });

    return () => scrollElem.removeEventListener("wheel", () => {});
  }, []);

  return (
    <motion.div
      animate={{
        opacity: isScrollUp ? 1 : 0,
        y: isScrollUp ? 0 : 100,
      }}
      className="fixed bottom-5 px-5 left-1/2 -translate-x-1/2 bg-slate-600 rounded-xl"
    >
      <button
        className="flex items-center flex-col hover:bg-slate-400 p-2"
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
    </motion.div>
  );
};

export default ChapterOptions;
