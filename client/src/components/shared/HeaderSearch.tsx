import React, { FC, useEffect, useState } from "react";
import UseAnimations from "react-useanimations";
import second from "react-useanimations/lib/searchToX";
import SearchBox from "./SearchBox";
import { ChapterItemType, ContentType } from "@/utils/types";

type Props = {
  placeholder?: string;
  data?: ChapterItemType[] | ContentType[];
  type?: "chapters" | "mangas";
  onChange: (src: any[]) => void;
};

const HeaderSearch: FC<Props> = ({
  placeholder = "Busca un manga...",
  data = [],
  type = "mangas",
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [original, setOriginal] = useState(data);

  useEffect(() => {
    if (type === "chapters") {
      const chapters = original as ChapterItemType[];
      const searchArr = chapters.filter(
        (d: ChapterItemType) => d.capNumber === search
      );

      if (!search) {
        onChange([]);
      } else {
        onChange(searchArr);
      }
    }
  }, [search]);

  return (
    <div className="relative">
      <div
        className={`relative h-12 
      overflow-hidden
      transition-[width]
      cursor-pointer 
      bg-primary-dark rounded-full bg-primary-dark-hover ${
        open ? "w-80" : "w-12"
      } `}
      >
        <button
          onClick={() => setOpen(!open)}
          className="
        left-6
        z-10
        absolute 
        left-30 top-1/2 -translate-x-2/4 
        -translate-y-2/4"
        >
          <UseAnimations
            reverse={open}
            size={22}
            animation={second}
            strokeColor={"#fff"}
          />
        </button>
        <div
          className="relative  w-64
          h-12
          flex
          align-middle
          justify-center"
        >
          <input
            type={type === "chapters" ? "number" : "text"}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="
          absolute
          w-full
          h-full
          left-12
          border-none
          outline-none
          bg-transparent
        "
            placeholder={placeholder}
          />
        </div>
      </div>
      <SearchBox data={data} type={type} />
    </div>
  );
};

export default HeaderSearch;
