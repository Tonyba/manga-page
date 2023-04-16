import React, { useState } from "react";

import { FaSortNumericDown } from "react-icons/fa";
import HeaderSearch from "../shared/HeaderSearch";

type filterProps = {
  order?: "asc" | "desc";
  search?: string;
};

const Filter = () => {
  const [filter, setFilters] = useState<filterProps>({
    order: "desc",
    search: "",
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FaSortNumericDown size={22} />
        <select
          defaultValue={filter.order}
          className="w-20 rounded-lg bg-slate-600 p-1 outline-none"
          onChange={(val) =>
            setFilters({ ...filter, search: val.target.value })
          }
        >
          <option>asc</option>
          <option>desc</option>
        </select>
      </div>

      <HeaderSearch placeholder="Busca un capitulo..." />
    </div>
  );
};

export default Filter;