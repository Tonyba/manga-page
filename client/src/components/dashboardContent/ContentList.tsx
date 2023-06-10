import React, { useEffect, useState, useRef } from "react";
import { DashboardListItem } from "./DashboardListItem";
import Link from "next/link";
import { ContentType, FiltersType } from "@/utils/types";
import FilterContent from "./favoritesComponents/FilterContent";
import { INIT_FILTER_STATE } from "@/utils/constants";
import Pagination from "../pagination/Pagination";
import { filterExp } from "@/utils/axios/filters";
import ExploradorSearch from "../Explorador/ExploradorSearch";
import ListContentBulkActions from "./dashboardAdminComponents/ListContentBulkActions";
import { ContentListContext } from "@/utils/context/ContentListContext";
import { LoadingWrapper } from "../shared/LoadingWrapper";


const ContentList = () => {
  const [content, setContent] = useState<ContentType[]>([]);
  const [filters, setFilters] =
  useState<FiltersType>(INIT_FILTER_STATE);
  const checkboxAll = useRef<HTMLInputElement>(null);
  const [ count, setCount ] = useState(0);
  const [loading, setLoading] = useState(true);

  const onPageChange = (page: number) => {
    setFilters({...filters, page});
  }

  const checkItem = (id: number) => {
      const newContent = content.map((item) => item.id === id ? {...item, checked: item.checked ? false : true } : item )
      setContent( newContent );
  }

  const countCheckedItems = () => {
    const count= content.reduce((prev, current) => {
     
      if (current.checked) prev++; 
      
      return prev;
    }, 0)

    return count;
  }

  const checkAll = () => {
    const newContent = content.map((item) => {
      return {...item, checked:  checkboxAll.current?.checked ? true : false};
    })
    setContent(newContent);
  }


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await filterExp(filters);
      const data = res.data;
      const result = data.result.map((item) => {
        return {...item, checked: false};
      });

      setCount(data.count);
      setContent(result);
      setLoading(false);
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
        <ContentListContext.Provider value={{
          content,
          filters,
          setContent,
          setCount,
          loading,
          setLoading,
          checkedAll: checkboxAll
        }} >

        <LoadingWrapper>
        <FilterContent filters={filters} setFilters={setFilters} />
      
      <div className="my-4" > 
        <ExploradorSearch filters={filters} setContent={setContent} setCount={setCount} />
      </div>  
      <ListContentBulkActions total={ countCheckedItems() } />
          <div className="grid grid-cols-1 overflow-auto">
            <table className="divide-y divider-primary inline-block lg:table">
              <thead>
                <tr className="[&>*]:font-normal [&>*]:text-left [&>*]:py-3">
                  <th className="pl-2 pr-4">
                    <input type="checkbox" onChange={checkAll} ref={checkboxAll} checked={checkboxAll.current?.checked} />
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
                  <DashboardListItem checkItem={checkItem} item={c} key={c.id} />
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

        </LoadingWrapper>
      </ContentListContext.Provider>
      
    </>
  );
};

export default ContentList;
