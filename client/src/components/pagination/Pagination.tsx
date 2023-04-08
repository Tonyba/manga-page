import React, { useState } from "react";
import Paginate from "react-paginate";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const Pagination = () => {
  return (
    <Paginate
      className="flex gap-5 mt-10 items-center"
      pageClassName="hover:bg-slate-700 rounded-full bg-slate-800 "
      pageLinkClassName="flex 
            items-center justify-center w-10 h-10  text-center 
            hover:bg-slate-700  rounded-full block"
      activeLinkClassName="bg-slate-700"
      nextLinkClassName="hover:bg-slate-700 w-10 h-10 rounded-full flex 
            items-center justify-center"
      previousLinkClassName="hover:bg-slate-700 w-10 h-10 rounded-full flex 
            items-center justify-center"
      initialPage={0}
      previousLabel={<FaChevronLeft />}
      nextLabel={<FaChevronRight />}
      onPageChange={(sel) => console.log(sel)}
      pageCount={3}
    />
  );
};

export default Pagination;
