import React, { useContext } from "react";
import FiltersFavorites from "./favoritesComponents/FiltersFavorites";
import useFilters from "@/hooks/useFilters";
import { AuthContext } from "@/utils/context/AuthContext";
import { initFilterState } from "@/utils/helpers";
import CardLoop from "../cardLoop/cardLoop";

const itemsPerPage = 18;

const DashboardFavorites = () => {
  const { favorites } = useContext(AuthContext);

  console.log(favorites);

  const [filters, setFilters, filterItems, currentPag, setCurrentPag] =
    useFilters({
      currentPag: 0,
      filters: initFilterState,
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
