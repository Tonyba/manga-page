import React, { useEffect, useState } from "react";
import { DashboardListItem } from "./DashboardListItem";
import Link from "next/link";
import { ContentType, FiltersType } from "@/utils/types";
import FilterContent from "./favoritesComponents/FilterContent";
import { INIT_FILTER_STATE } from "@/utils/constants";
import Pagination from "../pagination/Pagination";
import { filterExp } from "@/utils/axios/filters";
import ExploradorSearch from "../Explorador/ExploradorSearch";


const ContentList = () => {
  const [content, setContent] = useState<ContentType[]>([]);
  const [filters, setFilters] =
  useState<FiltersType>(INIT_FILTER_STATE);

  const [ count, setCount ] = useState(0)

  const onPageChange = (page: number) => {
    setFilters({...filters, page});
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await filterExp(filters);
      const data = res.data;

      setCount(count);
      setContent(data.result);
    };

    fetchData();
  }, [JSON.stringify(filters)]);

  return (
    <>
      <div className="flex items-center gap-3 mb-5">
        <h1 className="font-semibold text-3xl">Contenido</h1>
        <Link
          href={"/dashboard/add"}
          role="button"
          className="text-important button-primary-outline text-sm border border-button p-2 py-1 rounded-sm"
        >
          Agregar
        </Link>
      </div>
      <FilterContent filters={filters} setFilters={setFilters} />
      <section className="w-full">
         
        </section>
      <div className="grid grid-cols-1 overflow-auto">
       
    
       
      
        <table className="divide-y divider-primary inline-block lg:table">
          <thead>
            <tr className="[&>*]:font-normal [&>*]:text-left [&>*]:py-3">
              <th className="pl-2 pr-4">
                <input type="checkbox" />
              </th>
              <th className="pl-2 pr-4">Contenido</th>
              <th className="pl-2 pr-4">Capitulos</th>
              <th className="pl-2 pr-4">Fecha</th>
              <th className="pl-2 pr-4">Tipo</th>
              <th className="pl-2 pr-4">Estado</th>
              <th className="pl-2 pr-4">Demografia</th>
              <th className="pl-2 pr-4">Comentarios</th>
              <th className="pl-2 pr-4">Vistas</th>
            </tr>
          </thead>
          <tbody className="divide-y divider-primary ">
            {content.map((c) => (
              <DashboardListItem key={c.id} {...c} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center lg:justify-start my-5">
          <Pagination
            itemsPerPage={filters.limit}
            onPageChange={(val) => onPageChange(val)}
            pageCount={Math.ceil(count / filters.limit)}
            totalItems={count}
          />
        </div>
    </>
  );
};

export default ContentList;
