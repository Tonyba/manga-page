import React, { FC, useState } from "react";
import Paginate from "react-paginate";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

type Props = {
  pageCount: number;
  onPageChange: (selected: number) => void;
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
};

const Pagination: FC<Props> = ({
  pageCount,
  onPageChange,
  totalItems,
  itemsPerPage,
  initialPage = 0,
}) => {
  return pageCount > 1 ? (
    <Paginate
      className="flex gap-5 items-center"
      pageClassName="hover:bg-slate-700 rounded-full bg-slate-800"
      pageLinkClassName="flex 
            items-center justify-center w-10 h-10  text-center 
            hover:bg-slate-700  rounded-full block"
      activeLinkClassName="bg-slate-700"
      nextLinkClassName="hover:bg-slate-700 w-10 h-10 rounded-full flex 
            items-center justify-center"
      previousLinkClassName="hover:bg-slate-700 w-10 h-10 rounded-full flex 
            items-center justify-center"
      previousLabel={<FaChevronLeft />}
      nextLabel={<FaChevronRight />}
      breakLabel="..."
      onPageChange={({ selected }) => onPageChange(selected)}
      pageCount={pageCount}
      renderOnZeroPageCount={() => null}
      forcePage={initialPage}
    />
  ) : (
    <></>
  );
};

export default Pagination;
