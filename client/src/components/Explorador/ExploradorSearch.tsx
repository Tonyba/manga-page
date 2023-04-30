import useSearchContent from "@/hooks/useSearchContent";
import { searchByTitle } from "@/utils/axios/filters";
import { ExploradorContext } from "@/utils/context/ExploradorContext";
import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const ExploradorSearch = () => {
  const { setContent, setCount } = useContext(ExploradorContext);
  const [searchInputVal, setInputVal] = useState("");

  const fetchSearch = async () => {
    if (searchInputVal.length > 2) {
      const res = await searchByTitle(searchInputVal);
      console.log(res, "from search");
      setCount(res.data.count);
      setContent(res.data.result);
    }
  };

  return (
    <div className="flex">
      <input
        className="bg-primary w-full rounded-md rounded-e-none p-2 px-5 outline-none appearance-none"
        type="search"
        value={searchInputVal}
        placeholder="Busca un titulo..."
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            fetchSearch();
          }
        }}
      />
      <button
        onClick={fetchSearch}
        className="bg-primary-dark bg-primary-dark-hover px-4 rounded-md rounded-s-none"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default ExploradorSearch;
