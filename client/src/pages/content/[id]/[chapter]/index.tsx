import ChapterComments from "@/components/chapter/ChapterComments";
import ChapterNavigation from "@/components/chapter/ChapterNavigation";
import ChapterOptions from "@/components/chapter/ChapterOptions";
import ChapterSpinner from "@/components/chapter/ChapterSpinner";
import ChapterUpButton from "@/components/chapter/ChapterUpButton";
import { ChapterContext } from "@/utils/context/ChapterContext";
import { readStyleEnum } from "@/utils/types";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useContext, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

const ChapterContent = () => {
  const router = useRouter();
  const { id, chapter } = router.query;
  const [images, setImages] = useState<string[]>([]);
  const [readingStyle, setReadingStyle] = useState<readStyleEnum>(
    readStyleEnum.page
  );
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [currentChapter, setCurrentChapter] = useState<number>(
    parseInt(chapter as string)
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

  const handleClickOnImage = (e: React.MouseEvent<HTMLImageElement>) => {
    if (readingStyle !== readStyleEnum.page) return;

    handleChangeImage(currentImage + 1);
  };

  const totalChapters = 10;
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setLoading(true);
    setCurrentImage(0);
    const img = [];
    for (let index = 0; index < 10; index++) {
      img.push("https://picsum.photos/1000/1000");
    }
    setImages(img);
    setLoading(false);
  }, [chapter, currentChapter]);

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

      {readingStyle === readStyleEnum.cascade && <ChapterUpButton />}

      <ChapterOptions />

      <main className="text-center">
        <h1 className=" mx-5 text-xl  mb-5 font-medium text-center inline-block border px-10 py-2 rounded-lg hover:border-sky-500">
          <Link
            className="hover:text-sky-500 uppercase"
            href={`/content/${id}`}
          >
            EL GUARDIÁN DEL TIRANO ES UNA BRUJA MALVADA
          </Link>
          - Capitulo {chapter}
        </h1>

        <ChapterNavigation />
        <div className="bg-slate-600 mt-10 text-sm px-5 py-3  md:hidden">
          Puedes Cambiar de Pagina deslizando tus dedos en la imagen
        </div>
        <section className="my-10" {...handlers}>
          {loading ? (
            <ChapterSpinner />
          ) : (
            <ImagesReader onImageClick={handleClickOnImage} />
          )}
        </section>

        <ChapterNavigation />

        <section className="max-w-7xl mx-auto my-10 border border-dashed p-5">
          <ChapterComments />
        </section>
      </main>
    </ChapterContext.Provider>
  );
};

type Props = {
  onImageClick: (e: any) => void;
};

const ImagesReader: FC<Props> = ({ onImageClick }) => {
  const { readingStyle, images, currentImage } = useContext(ChapterContext);
  return (
    <div className="min-h-max">
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
          onClick={onImageClick}
          src={images[currentImage]}
          className="mx-auto cursor-pointer"
          alt={currentImage.toString()}
        />
      )}
    </div>
  );
};

export default ChapterContent;
