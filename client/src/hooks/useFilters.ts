import { ContentType, FiltersType } from "@/utils/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useFilters = (filtersOptions: {
  items: ContentType[];
  itemsPerPage: number;
  currentPag: number;
  filters: FiltersType;
}): [
  FiltersType,
  Dispatch<SetStateAction<FiltersType>>,
  (pag: number) => ContentType[],
  number,
  Dispatch<SetStateAction<number>>
] => {
  let { filters, items, currentPag, itemsPerPage } = filtersOptions;

  const [filtered, setFilters] = useState<FiltersType>(filters);
  const [currentPage, setCurrentPage] = useState(currentPag);

  useEffect(() => {
    filterItems(currentPage);
  }, [Object.values(filtered), currentPage]);

  const filterItems = (pag = 0) => {
    const filtersConditions = {
      type: (item: ContentType) =>
        !filters.type ? true : filters.type == item.type,
      demography: (item: ContentType) =>
        !filters.demography
          ? true
          : filters.demography == item.demography.toLowerCase(),
      status: (item: ContentType) =>
        !filters.status
          ? true
          : filters.status == item.status?.toLowerCase() ||
            item.status == "Emision",
      genres: (item: ContentType) =>
        filters.genres?.length == 0
          ? true
          : filters.genres?.every((g: any) => item?.genres?.includes(g.label)),
    };

    const selectedT = [
      filtersConditions.type,
      filtersConditions.demography,
      filtersConditions.genres,
      filtersConditions.status,
    ];

    let result = items.filter((fav) => selectedT.every((f) => f(fav)));

    if (Array.isArray(result[0])) result = [];

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

  return [filtered, setFilters, filterItems, currentPage, setCurrentPage];
};

export default useFilters;
