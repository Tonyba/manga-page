import Head from "next/head";
import Image from "next/image";

import { BiBookmarks } from "react-icons/bi";
import { ContentType } from "@/utils/types";
import { useEffect, useState } from "react";
import CardLoop from "@/components/cardLoop/cardLoop";
import { HomeSidebar } from "@/components/sidebars/HomeSidebar";
import CarouselSwiper from "@/components/carousel/CarouselSwiper";
import { getMangas } from "@/utils/axios/contentType";

export default function Home() {
  const [content, setContent] = useState<ContentType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getMangas();
      const content = resp.data;

      setContent(content);
    };

    fetchData();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-5 xl:px-0">
      <CarouselSwiper content={content} />
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
        <aside className="w-full xl:w-1/4 pl-0 xl:pl-5">
          <HomeSidebar />
        </aside>
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
