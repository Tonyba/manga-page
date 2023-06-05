import React, { FC, useContext, useEffect, useRef, useState } from "react";

import { FaSortNumericDown } from "react-icons/fa";
import HeaderSearch from "../shared/HeaderSearch";
import ViewChapterFilterContext, { ActionsChapterFilterContext } from "@/utils/context/ChapterFilterContext";

type filterProps = {
  order?: "asc" | "desc";
  search?: string;
  type?: "chapters" | "mangas";
};

const Filter: FC<filterProps> = ({ type }) => {
  
  const { chapters } = useContext(ViewChapterFilterContext);
  const { setChapters } = useContext(ActionsChapterFilterContext);

  const [filter, setFilters] = useState<filterProps>({
    order: "desc",
    search: "",
    type,
  });

  const isMounted = useRef(false);

  const handleChange = (val: "asc" | "desc") => {
    const reversed = [...chapters].reverse().map(elem => elem);

    setChapters(reversed);
    setFilters({ ...filter, order: val})
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FaSortNumericDown size={22} />
        <select
          defaultValue={filter.order}
          className="w-20 rounded-lg bg-slate-600 p-1 outline-none"
          onChange={(val) => handleChange(val.target.value as "asc" | "desc") }
        >
          <option>ASC</option>
          <option>DESC</option>
        </select>
      </div>

      <HeaderSearch
        placeholder="Busca un capitulo..."
        onChange={(src) => {}}
        type={type}
        data={chapters}
      />
    </div>
  );
};

export default Filter;
