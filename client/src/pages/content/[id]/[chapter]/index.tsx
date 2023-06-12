import ChapterComments from "@/components/chapter/ChapterComments";
import ChapterNavigation from "@/components/chapter/ChapterNavigation";
import ChapterOptions from "@/components/chapter/ChapterOptions";
import ChapterUpButton from "@/components/chapter/ChapterUpButton";
import ImagesReader from "@/components/content/ImageReader";
import { getChapterImages } from "@/utils/axios/contentType";
import { ChapterContext } from "@/utils/context/ChapterContext";
import { getChapterNumber } from "@/utils/helpers";
import { GetChapterResponse, readStyleEnum } from "@/utils/types";
import { motion, useScroll } from "framer-motion";
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from "next";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

const ChapterContent = ({ images, manga }: GetChapterResponse) => {

  console.log(manga)

  const router = useRouter();
  const { id, chapter } = router.query;
  const [chapterImages, setImages] = useState<string[]>([]);
  const [readingStyle, setReadingStyle] = useState<readStyleEnum>(
    readStyleEnum.page
  );
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [currentChapter, setCurrentChapter] = useState<string>(
    chapter as string
  );

  const handlers = useSwipeable({
    onSwiped: ({ dir }) => handleSwipe(dir),
  });

  const handleSwipe = (direction: string) => {
    if (direction === "Right") handleChangeImage(currentImage - 1);
    if (direction === "Left") handleChangeImage(currentImage + 1);
  };

  const handleChangeImage = (imgIndex: number) => {
    if (imgIndex < currentImage && imgIndex >= 0) {
      setCurrentImage(imgIndex);
    }

    if (imgIndex > currentImage && imgIndex < images.length) {
      setCurrentImage(imgIndex);
    }
  };

  const handleClickOnImage = () => {
    if (readingStyle !== readStyleEnum.page) return;

    handleChangeImage(currentImage + 1);
  };

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setCurrentImage(0);

    setImages(images.map(img => img.url));
  }, [chapter, currentChapter]);

  return (
    <ChapterContext.Provider
      value={{
        chapters: manga.episodes,
        contentTitle: manga.title,
        currentChapter: manga.episodes?.find(
          (v) => v.capNumber === getChapterNumber(chapter as string)
        ),
        images: chapterImages,
        setCurrentChapter,
        setCurrentImage,
        currentImage,
        readingStyle,
        setReadingStyle,
      }}
    >
      {readingStyle == readStyleEnum.cascade && scrollYProgress.get() != 0 && (
        <motion.div
          className="fixed top-0 left-0 right-0 hover:text-primary  h-1"
          style={{ scaleX: scrollYProgress, originX: 0 }}
        />
      )}

      {readingStyle === readStyleEnum.cascade && <ChapterUpButton />}

      <ChapterOptions />

      <main className="text-center">
        <h1 className=" mx-5 text-xl  mb-5 font-medium text-center inline-block border px-10 py-2 rounded-lg border-important-hover">
          <Link
            className="text-important-hover uppercase"
            href={`/content/${id}`}
          >
            {manga.title}
          </Link>
          - Capitulo {getChapterNumber(chapter as string)}
        </h1>

        <ChapterNavigation />
        {readingStyle === readStyleEnum.page && (
          <div className="bg-primary mt-10 text-sm px-5 py-3  md:hidden">
            Puedes Cambiar de Pagina deslizando tus dedos en la imagen
          </div>
        )}

        <section className="my-10" {...handlers}>
          <ImagesReader onImageClick={handleClickOnImage} />
        </section>

        <ChapterNavigation />

        <section className="max-w-7xl mx-auto my-10 border border-dashed p-5">
          <ChapterComments />
        </section>
      </main>
    </ChapterContext.Provider>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps = async (
  ctx
): Promise<GetStaticPropsResult<GetChapterResponse>> => {
  const { id, chapter } = ctx.params as { id: string; chapter: string };

  if (!id || !chapter) Router.reload();

  const capNumber = chapter.split('-')[1];

  const chapterRequest = await getChapterImages(parseInt(capNumber), id);
  const chapterResp = chapterRequest.data;

  return {
    props: chapterResp,
  };
};

export default ChapterContent;
