import ExploradorSidebar from "@/components/sidebars/ExploradorSidebar";
import { ExploradorContext } from "@/utils/context/ExploradorContext";
import { ContentType, FiltersType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import CardLoop from "@/components/cardLoop/cardLoop";
import Pagination from "@/components/pagination/Pagination";
import ExploradorSearch from "@/components/Explorador/ExploradorSearch";
import { filterExp } from "@/utils/axios/filters";
import { INIT_FILTER_STATE } from "@/utils/constants";

const Explorador = () => {
  const [content, setContent] = useState<ContentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState<FiltersType>(INIT_FILTER_STATE);

  const handlePageChange = (selected: number) => {
    let page = selected + 1;
    setFilters({ ...filters, page });
  };

  const fetchData = async () => {
    setLoading(false);
    const res = await filterExp(filters);
    setCount(res.data.count);
    setContent(res.data.result);
    setLoading(true);
  };

  useEffect(() => {
    fetchData();
  }, [filters.page]);

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
                itemsPerPage={filters.limit}
                onPageChange={handlePageChange}
                pageCount={Math.ceil(count / filters.limit)}
              />
            </div>
          </div>
        </section>
      </main>
    </ExploradorContext.Provider>
  );
};

export default Explorador;
