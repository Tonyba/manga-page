import React, { FC, useEffect, useState } from "react";
import UseAnimations from "react-useanimations";
import second from "react-useanimations/lib/searchToX";
import SearchBox from "./SearchBox";
import { ChapterItemType, ContentType } from "@/utils/types";
import { searchByTitle } from "@/utils/axios/filters";
import { useIsMobile } from "@/hooks/useIsMobile";

import SearchMobile from "./SearchMobile";

type Props = {
  placeholder?: string;
  data?: ChapterItemType[] | ContentType[];
  type?: "chapters" | "mangas";
  onChange: (src: ChapterItemType[] | ContentType[]) => void;
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
  const [isMobile] = useIsMobile();
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    await searchByTitle(search)
      .then((res) => res.data)
      .then((res) => {
        setLoading(false);
        onChange(res.result);
      })
      .catch((err) => console.log(err));
  };

  const handleOpen = () => {
    onChange([]);
    setOpen(!open);
    setSearch("");
  };

  useEffect(() => {
    if (type === "chapters") {
      const chapters = original as ChapterItemType[];
      const searchArr = chapters.filter(
        (d: ChapterItemType) => {
          const regex = RegExp(`${search}`, 'g');
          return  d.capNumber.toString().match(regex);
        }
      );

      if (!search) {
        onChange([]);
      } else {
        onChange(searchArr);
      }
    } else {
      if (!search) onChange([]);
      if (search.length < 2) return;
      onChange([]);
      setLoading(true);
      let searchTimer = setTimeout(() => {
        fetchData();
      }, 1000);

      return () => {
        clearTimeout(searchTimer);
      };
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
        open && !isMobile ? "w-80" : "w-12"
      } `}
      >
        <button
          onClick={() => handleOpen()}
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
            minLength={1}
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

      {isMobile ? (
        <SearchMobile
          data={data}
          type={type}
          handleOpen={handleOpen}
          open={open}
          search={search}
          setSearch={setSearch}
          isLoading={isLoading}
        />
      ) : (
        search && <SearchBox data={data} type={type} isLoading={isLoading} />
      )}
    </div>
  );
};

export default HeaderSearch;
