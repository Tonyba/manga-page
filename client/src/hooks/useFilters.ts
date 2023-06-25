import { ContentType, FiltersType } from "@/utils/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useFilters = (filtersOptions: {
  items: ContentType[];
  itemsPerPage: number;
  currentPag: number;
  filters: FiltersType;
}): [
  (pag: number) => ContentType[],
  number,
  Dispatch<SetStateAction<number>>
] => {
  let { filters, items, currentPag, itemsPerPage } = filtersOptions;

  const [currentPage, setCurrentPage] = useState(currentPag);

  useEffect(() => {
    filterItems(currentPage);
  }, [Object.values(filters), currentPage]);

  const filterItems = (pag = 0) => {
    console.log(filters);
    const filtersConditions = {
      type: (item: ContentType) =>
        !filters.type ? true : filters.type === item.type,
      demography: (item: ContentType) =>
        !filters.demography ? true : filters.demography === item.demography,
      status: (item: ContentType) =>
        !filters.status ? true : filters.status === item.status,
      genres: (item: ContentType) =>
        filters.genres?.length === 0
          ? true
          : filters.genres?.every((g: any) => item?.genres?.includes(g)),
    };

    const selectedT = [
      filtersConditions.type,
      filtersConditions.demography,
      filtersConditions.genres,
      filtersConditions.status,
    ];

    let result = items.filter((fav) => selectedT.every((f) => f(fav)));

    let paginated = result.slice(
      currentPag * itemsPerPage,
      currentPag * itemsPerPage + itemsPerPage
    );

    if (paginated.length === 0 && pag > 0) pag--;

    let from = pag * itemsPerPage;
    let to = pag * itemsPerPage + itemsPerPage;

    paginated = result.slice(from, to);

    return paginated;
  };

  return [filterItems, currentPage, setCurrentPage];
};

export default useFilters;
