import { ExploradorContext } from "@/utils/context/ExploradorContext";
import React, { useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const ExploradorSearch = () => {
  const { setContent } = useContext(ExploradorContext);

  useEffect(() => {}, []);

  return (
    <div className="flex">
      <input
        className="bg-primary w-full rounded-md rounded-e-none p-2 px-5 outline-none"
        type="text"
        placeholder="Busca un titulo..."
      />
      <button className="bg-primary-dark bg-primary-dark-hover px-4 rounded-md rounded-s-none">
        <FaSearch />
      </button>
    </div>
  );
};

export default ExploradorSearch;
