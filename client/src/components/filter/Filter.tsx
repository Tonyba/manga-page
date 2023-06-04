import React, { FC, useEffect, useRef, useState } from "react";

import { FaSortNumericDown } from "react-icons/fa";
import HeaderSearch from "../shared/HeaderSearch";
import { ChapterItemType } from "@/utils/types";

type filterProps = {
  order?: "asc" | "desc";
  search?: string;
  data: any[];
  type?: "chapters" | "mangas";
  onChange?: (data: any[]) => void;
  onOrderChange?: (data: ChapterItemType[]) => void;
};

const Filter: FC<filterProps> = ({ type, data, onChange = () => {}, onOrderChange= () => {} }) => {
  const [filter, setFilters] = useState<filterProps>({
    order: "desc",
    search: "",
    data,
    type,
  });

  const isMounted = useRef(false);

  useEffect(() => { 
    
    if(isMounted.current) isMounted.current = true;

    const reversed = [...data].reverse();
    onOrderChange(reversed);
  }, [filter.order])

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FaSortNumericDown size={22} />
        <select
          defaultValue={filter.order}
          className="w-20 rounded-lg bg-slate-600 p-1 outline-none"
          onChange={(val) =>
            setFilters({ ...filter, order: val.target.value as "asc" | "desc" })
          }
        >
          <option>asc</option>
          <option>desc</option>
        </select>
      </div>

      <HeaderSearch
        placeholder="Busca un capitulo..."
        onChange={(src) => setFilters({ ...filter, data: src })}
        type={type}
        data={data}
      />
    </div>
  );
};

export default Filter;
