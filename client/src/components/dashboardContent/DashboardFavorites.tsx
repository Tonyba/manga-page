import React, { useContext, useState } from "react";
import FiltersFavorites from "./favoritesComponents/FilterContent";
import useFilters from "@/hooks/useFilters";
import { AuthContext } from "@/utils/context/AuthContext";

import CardLoop from "../cardLoop/cardLoop";
import { INIT_FILTER_STATE } from "@/utils/constants";
import { FiltersType } from "@/utils/types";
import Pagination from "../pagination/Pagination";

const itemsPerPage = 18;

const DashboardFavorites = () => {
  const { favorites } = useContext(AuthContext);
  const [filtersFavorites, setFilters] =
    useState<FiltersType>(INIT_FILTER_STATE);

  const totalPages = Math.ceil(favorites.length / itemsPerPage);

  const [filterItems, currentPag, setCurrentPag] = useFilters({
    currentPag: 0,
    filters: filtersFavorites,
    items: favorites,
    itemsPerPage,
  });

  const items = filterItems(currentPag);

  return (
    <>
      <FiltersFavorites filters={filtersFavorites} setFilters={setFilters} />
      <div className="mt-7">
        {items.length > 0 && <CardLoop items={items} action="remove" />}

        <div className="flex justify-center lg:justify-end">
          <Pagination
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPag}
            pageCount={totalPages}
            totalItems={favorites.length}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardFavorites;
