import { ChapterContext } from "@/utils/context/ChapterContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useContext, useEffect, useState } from "react";
import Popup from "../shared/Popup";
import { ChapterItemType } from "@/utils/types";
import ScrollbarBox from "../scrollbarBox/ScrollbarBox";

type Props = {
  isOpen: boolean;
  onModalClose: () => void;
};

const ChapterSearch: FC<Props> = ({ isOpen = false, onModalClose }) => {
  const { chapters, currentChapter } = useContext(ChapterContext);
  const [filteredChaps, setFilteredChaps] = useState<ChapterItemType[]>([]);
  const [search, setSearch] = useState("");

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (search) {
      const newFilter = chapters.filter(
        (ch) => ch.capNumber.toString() === search
      );
      setFilteredChaps(newFilter);
    } else {
      setFilteredChaps(chapters);
    }
  }, [search, chapters]);

  return (
    <Popup
      isOpen={isOpen}
      onModalClose={onModalClose}
      className="bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center"
    >
      <div className="bg-primary p-5 rounded-lg">
        <div className="px-2">
          <h3 className="uppercase font-semibold mb-2">Capitulos</h3>
          <div>
            <input
              type="search"
              className="bg-slate-700 p-2 rounded-md outline-none mb-2"
              placeholder="Busca un Capitulo..."
              pattern="[0-9]*"
              onChange={(e) =>
                setSearch(e.target.validity.valid ? e.target.value : search)
              }
              value={search}
            />
          </div>
        </div>

        <ScrollbarBox>
          <ul className="flex flex-col gap-3 px-2 max-h-64">
            {filteredChaps.map((ch, index) => {
              return (
                <li key={index} className="w-full">
                  <Link
                    className={`${
                      ch.id === currentChapter?.id
                        ? "bg-slate-500"
                        : "bg-slate-700"
                    } flex w-full px-2 py-1 hover:bg-slate-500 items-center justify-between capitalize`}
                    href={`/content/${id}/capitulo-${ch.capNumber}`}
                  >
                    {ch.title}
                    {ch.id === currentChapter?.id && (
                      <span className="bg-black p-1 rounded-md text-sm">
                        Leyendo
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </ScrollbarBox>
      </div>
    </Popup>
  );
};

export default ChapterSearch;
