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
import { getManga } from "@/utils/axios/contentType";
import Router from "next/router";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsResult,
  NextPage,
} from "next";
import { ContentResponseType } from "@/utils/types";

const Content: NextPage<ContentResponseType | undefined> = (content) => {
  const [related, setRelated] = useState<ContentType[]>([]);
  const [filteredCaps, setFilteredCaps] = useState<ChapterItemType[]>(
    content?.manga.Episodes || []
  );

  const { manga } = content as ContentResponseType;
  const {
    banner,
    demography,
    description,
    genres,
    image,
    status,
    title,
    type,
    Episodes,
  } = manga;

  const onChange = (data: any) => {
    console.log(data);
    setFilteredCaps(data);
  };

  useEffect(() => {
    const rel: ContentType[] = [];
    for (let index = 0; index < 10; index++) {
      rel.push({
        id: parseInt(faker.random.numeric()),
        type: faker.random.word(),
        title: faker.random.word(),
        description: faker.lorem.words(20),
        demography: faker.datatype.string(),
        image: "https://picsum.photos/225/300",
        genres: [],
        status: faker.word.noun(),
        Episodes: [],
        banner: "",
      });
    }

    setRelated(rel);
  }, []);

  return (
    <>
      <section
        className="py-5"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
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
          src={image as string}
          alt={title || ""}
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
            <h1 className="text-center font-medium mb-3 text-4xl">{title}</h1>
            <p>{description}</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl flex flex-col xl:flex-row py-10 sm:px-7 2xl:px-0 mx-7 sm:mx-auto">
        <aside className="w-full xl:w-1/4 bg-primary-dark p-5 rounded-md">
          <ContentSidebar
            status={(content && status) || ""}
            contentType={(content && type) || ""}
            genres={genres || []}
            demography={demography}
          />
        </aside>

        <div className="w-full xl:w-3/4  xl:pl-10 mt-10 xl:mt-0">
          <div className="mb-3">
            <Filter data={filteredCaps} onChange={onChange} type="chapters" />
          </div>

          <h2 className="text-2xl font-medium">Capitulos</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
            {content?.manga.Episodes.map((ch, index) => (
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

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps = async (
  ctx
): Promise<GetStaticPropsResult<ContentResponseType>> => {
  const { id } = ctx.params as { id: string };

  if (!id) Router.reload();

  const resp = await getManga(id as string);
  const contentResp = resp.data;

  return {
    props: contentResp,
  };
};

export default Content;
