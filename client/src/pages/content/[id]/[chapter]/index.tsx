import ChapterNavigation from "@/components/chapter/ChapterNavigation";
import ChapterOptions from "@/components/chapter/ChapterOptions";
import { ChapterContext } from "@/utils/context/ChapterContext";
import { readStyleEnum } from "@/utils/types";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ChapterContent = () => {
  const router = useRouter();
  const { id, chapter } = router.query;
  const [images, setImages] = useState<string[]>([]);
  const [readingStyle, setReadingStyle] = useState<readStyleEnum>(
    readStyleEnum.page
  );
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [currentChapter, setCurrentChapter] = useState<number>(
    parseInt(chapter as string)
  );

  const totalChapters = 10;
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setCurrentImage(0);
    const img = [];
    for (let index = 0; index < 10; index++) {
      img.push("https://picsum.photos/1000/1000");
    }
    setImages(img);
  }, [chapter]);

  return (
    <ChapterContext.Provider
      value={{
        totalChapters,
        contentTitle: "Guardian Tirano",
        currentChapter: parseInt(chapter as string),
        images,
        setCurrentChapter,
        setCurrentImage,
        currentImage,
        readingStyle,
        setReadingStyle,
      }}
    >
      {readingStyle == readStyleEnum.cascade && scrollYProgress.get() != 0 && (
        <motion.div
          className="fixed top-0 left-0 right-0 bg-sky-500 h-1"
          style={{ scaleX: scrollYProgress, originX: 0 }}
        />
      )}

      <ChapterOptions />

      <main className="text-center">
        <h1 className="text-xl  mb-5 font-medium text-center inline-block border px-10 py-2 rounded-lg hover:border-sky-500">
          <Link
            className="hover:text-sky-500 uppercase"
            href={`/content/${id}`}
          >
            EL GUARDIÁN DEL TIRANO ES UNA BRUJA MALVADA
          </Link>
          - Capitulo {chapter}
        </h1>

        <section className="flex justify-between mx-auto max-w-7xl items-center">
          <ChapterNavigation />
        </section>

        <section className="my-10">
          {readingStyle === readStyleEnum.cascade ? (
            images.map((img, index) => (
              <p key={index} style={{ all: "unset" }}>
                <img
                  key={index}
                  src={img}
                  className="mx-auto"
                  alt=""
                  loading="lazy"
                />
              </p>
            ))
          ) : (
            <img
              src={images[currentImage]}
              className="mx-auto"
              alt={currentImage.toString()}
              loading="lazy"
            />
          )}
          {}
        </section>

        <section className="flex justify-between mx-auto max-w-7xl items-center">
          <ChapterNavigation />
        </section>
      </main>
    </ChapterContext.Provider>
  );
};

export default ChapterContent;
