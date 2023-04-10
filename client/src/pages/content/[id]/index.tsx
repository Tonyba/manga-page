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
        "
          priority={true}
          src={content?.image as string}
          alt={content?.title || ""}
        />
        <div
          className="
      max-w-7xl 
      w-full mx-auto
      bg-slate-600
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
      </section>

      <section className="max-w-7xl mx-auto flex py-10">
        <aside className="w-1/4 bg-slate-800 p-5 rounded-md">
          <ContentSidebar
            status={(content && content?.status) || ""}
            contentType={(content && content?.contentType) || ""}
            genres={content?.genres || []}
          />
        </aside>

        <div className="w-3/4 pl-10">
          <div className="mb-3">
            <Filter />
          </div>

          <h2 className="text-2xl font-medium">Capitulos</h2>

          <div className="grid grid-cols-4 gap-5 mt-4">
            {content?.chapters.map((ch, index) => (
              <ContentChapters key={index} {...ch} />
            ))}
          </div>

          <Pagination />
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-10">
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
