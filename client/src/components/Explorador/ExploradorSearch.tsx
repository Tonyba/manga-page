import { filterExp, searchByTitle } from "@/utils/axios/filters";
import { FiltersType } from "@/utils/types";
import { ContentType } from "@/utils/types";
import React, { FC, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
  setContent: (data: ContentType[]) => void;
  setCount: (count: number) => void;
  filters: FiltersType;
}

const ExploradorSearch: FC<Props> = ({ setContent, setCount, filters }) => {
  const [searchInputVal, setInputVal] = useState("");

  const isMounted = useRef(false);

  const fetchSearch = async () => {
    if (searchInputVal.length > 2) {
      const res = await searchByTitle(searchInputVal);
      console.log(res, "from search");
      setCount(res.data.count);
      setContent(res.data.result);
    } 
  };

  useEffect(() => {

    if(!isMounted.current) isMounted.current = true;

    const fetchData = async () => {
      const res = await filterExp(filters);
      setCount(res.data.count);
      setContent(res.data.result);
    }

    if(!searchInputVal && isMounted) {
      fetchData()
    }
  }, [searchInputVal]);

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
