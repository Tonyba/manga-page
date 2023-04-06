import Carousel from "@/components/carousel/Carousel";
import Head from "next/head";
import Image from "next/image";

import { faker } from "@faker-js/faker";
import { BiBookmarks } from "react-icons/bi";
import { ContentType } from "@/utils/types";
import { useEffect, useState } from "react";
import CardLoop from "@/components/cardLoop/cardLoop";
import { HomeSidebar } from "@/components/sidebars/HomeSidebar";

export default function Home() {
  const [content, setContent] = useState<ContentType[]>([]);

  useEffect(() => {
    const items: ContentType[] = [];
    for (let index = 0; index < 12; index++) {
      items.push({
        id: parseInt(faker.random.numeric()),
        contentType: faker.random.word(),
        title: faker.random.word(),
        description: faker.lorem.words(20),
        demography: faker.datatype.string(),
        image: "https://picsum.photos/225/300",
      });
    }

    setContent(items);
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-5 xl:px-0">
      <Carousel content={content} />
      <section className="flex py-10 flex-col xl:flex-row flex-wrap">
        <div className="w-full xl:w-3/4">
          <div className="flex gap-2 mb-5">
            <BiBookmarks className="text-3xl md:text-4xl" />
            <h2 className="text-2xl md:text-4xl font-semibold">
              Ultimas Publicaciones
            </h2>
          </div>

          <CardLoop items={content} fourCols={true} />
        </div>
        <div className="w-full xl:w-1/4 pl-0 xl:pl-5">
          <HomeSidebar />
        </div>
      </section>
      <section className="w-full mt-5">
        <div className="w-full">
          <div className="flex gap-2 mb-5">
            <BiBookmarks className="text-3xl md:text-4xl" />
            <h2 className="text-2xl md:text-4xl font-semibold">
              Ultimas Publicaciones - Manga
            </h2>
          </div>

          <CardLoop items={content} />
        </div>
      </section>
    </main>
  );
}
