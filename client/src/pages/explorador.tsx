import ExploradorSidebar from "@/components/sidebars/ExploradorSidebar";
import { ExploradorContext } from "@/utils/context/ExploradorContext";
import { ContentType, FiltersType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import CardLoop from "@/components/cardLoop/cardLoop";
import Pagination from "@/components/pagination/Pagination";
import ExploradorSearch from "@/components/Explorador/ExploradorSearch";

const initFilters = {
  type: "Manga",
  demography: "",
  status: "",
  genres: [],
};

const Explorador = () => {
  const [content, setContent] = useState<ContentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState<FiltersType>(initFilters);

  const itemPerPage = 18;

  const handlePageChange = async (selected: number) => {
    setLoading(true);
    // const { data } = await search(filters, 18, selected + 1);
    setLoading(false);
    // setItems(data.result);
  };

  useEffect(() => {
    const items: ContentType[] = [];
    for (let index = 0; index < 12; index++) {
      items.push({
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

    setContent(items);
  }, []);

  return (
    <ExploradorContext.Provider
      value={{
        content,
        setContent,
        loading,
        filters,
        setFilters,
        setCount,
        setLoading,
      }}
    >
      <main className="max-w-7xl mx-auto px-5 xl:px-0 mt-5">
        <section className="w-full">
          <ExploradorSearch />
        </section>
        <section className="flex py-10 flex-col xl:flex-row flex-wrap">
          <aside className="w-full mb-10 xl:mb-0 xl:w-1/4">
            <ExploradorSidebar />
          </aside>
          <div className="w-full xl:w-3/4 pl-0 xl:pl-5">
            <CardLoop items={content} fourCols={true} />

            <div className="flex justify-center">
              <Pagination
                totalItems={count}
                itemsPerPage={itemPerPage}
                onPageChange={handlePageChange}
                pageCount={Math.ceil(count / itemPerPage)}
              />
            </div>
          </div>
        </section>
      </main>
    </ExploradorContext.Provider>
  );
};

export default Explorador;
