import React, { useContext } from "react";
import FiltersFavorites from "./favoritesComponents/FiltersFavorites";
import useFilters from "@/hooks/useFilters";
import { AuthContext } from "@/utils/context/AuthContext";

import CardLoop from "../cardLoop/cardLoop";
import { INIT_FILTER_STATE } from "@/utils/constants";

const itemsPerPage = 18;

const DashboardFavorites = () => {
  const { favorites } = useContext(AuthContext);

  console.log(favorites);

  const [filters, setFilters, filterItems, currentPag, setCurrentPag] =
    useFilters({
      currentPag: 0,
      filters: INIT_FILTER_STATE,
      items: favorites,
      itemsPerPage,
    });

  const items = filterItems(currentPag);

  return (
    <>
      <FiltersFavorites filters={filters} setFilters={setFilters} />
      <div className="mt-7">
        {items.length > 0 && <CardLoop items={items} action="remove" />}
      </div>
    </>
  );
};

export default DashboardFavorites;
