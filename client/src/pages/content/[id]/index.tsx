import { ChapterItemType, ContentType } from "@/utils/types";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ContentSidebar from "@/components/content/ContentSidebar";
import ContentChapters from "@/components/content/ContentChapters";
import Filter from "@/components/filter/Filter";
import Pagination from "@/components/pagination/Pagination";
import Carousel from "@/components/carousel/Carousel";
import { BiBookmarks } from "react-icons/bi";
import { Router, useRouter } from "next/router";

const Content = () => {
  const [content, setContent] = useState<ContentType>();
  const [related, setRelated] = useState<ContentType[]>([]);

  useEffect(() => {
    const ch: ChapterItemType[] = [];
    const rel: ContentType[] = [];

    for (let index = 0; index < 10; index++) {
      ch.push({
        image: "https://picsum.photos/200/150",
        text: "Capitulo " + index,
        chapter: index.toString(),
        contentId: index,
      });
      rel.push({
        id: parseInt(faker.random.numeric()),
        contentType: faker.random.word(),
        title: faker.random.word(),
        description: faker.lorem.words(20),
        demography: faker.datatype.string(),
        image: "https://picsum.photos/225/300",
        genres: [],
        status: faker.word.noun(),
        chapters: [],
      });
    }
    setContent({
      id: parseInt(faker.random.numeric()),
      contentType: faker.random.word(),
      title: faker.random.words(2),
      description: faker.lorem.words(80),
      demography: faker.datatype.string(),
      image: "https://picsum.photos/1024/450",
      genres: faker.datatype.array() as string[],
      status: faker.random.word(),
      chapters: ch,
    });
    setRelated(rel);
  }, []);

  return (
    <>
      <section
        className="py-5"
        style={{
          backgroundImage: `url(${content?.image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Image
          width={530}
          height={530}
          className="rounded-lg 
          h-[380px]  
          mx-auto
          -mb-10
          z-10
          relative
          object-cover
        "
          priority={true}
          src={content?.image as string}
          alt={content?.title || ""}
        />
        <div className="mx-7 2xl:mx-0">
          <div
            className="
      max-w-7xl 
      w-full mx-auto
      bg-primary
      relative
      px-7
      pt-14
      pb-7
      rounded-md
      "
          >
            <h1 className="text-center font-medium mb-3 text-4xl">
              {content?.title}
            </h1>
            <p>{content?.description}</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl flex flex-col xl:flex-row py-10 sm:px-7 2xl:px-0 mx-7 sm:mx-auto">
        <aside className="w-full xl:w-1/4 bg-primary-dark p-5 rounded-md">
          <ContentSidebar
            status={(content && content?.status) || ""}
            contentType={(content && content?.contentType) || ""}
            genres={content?.genres || []}
          />
        </aside>

        <div className="w-full xl:w-3/4  xl:pl-10 mt-10 xl:mt-0">
          <div className="mb-3">
            <Filter />
          </div>

          <h2 className="text-2xl font-medium">Capitulos</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
            {content?.chapters.map((ch, index) => (
              <ContentChapters key={index} {...ch} />
            ))}
          </div>
          <div className="mt-10">
            <Pagination />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-7 sm:mx-auto py-10 sm:px-7 2xl:px-0">
        <div className="flex gap-2 mb-5">
          <BiBookmarks className="text-3xl md:text-4xl" />
          <h2 className="text-2xl md:text-4xl font-semibold">
            Recomendaciones
          </h2>
        </div>

        <Carousel content={related} />
      </section>
    </>
  );
};

export default Content;
