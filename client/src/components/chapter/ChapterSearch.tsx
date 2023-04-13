import { ChapterContext } from "@/utils/context/ChapterContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useContext, useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onModalClose: () => void;
};

const ChapterSearch: FC<Props> = ({ isOpen = false, onModalClose }) => {
  const { totalChapters, currentChapter } = useContext(ChapterContext);
  const [filteredChaps, setFilteredChaps] = useState<number[]>([]);
  const [chapters, setChapters] = useState<number[]>([]);
  const [search, setSearch] = useState("");

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const ch = [];
    for (let index = 0; index < totalChapters; index++) {
      ch.push(index);
    }

    setChapters(ch);
  }, []);

  useEffect(() => {
    if (search) {
      const newFilter = chapters.filter((ch) => ch.toString() === search);
      setFilteredChaps(newFilter);
    } else {
      setFilteredChaps(chapters);
    }
  }, [search, chapters]);

  const handleOnModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.id === "modal") onModalClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal"
      onClick={handleOnModalClose}
      role="dialog"
      className={`fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center
    `}
    >
      <div className="bg-slate-600 p-5 rounded-lg ">
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

        <ul className="flex flex-col gap-3  max-h-64 scrollbar scrollbar-w-[5px] px-2 scrollbar-thumb-rounded  scrollbar-thumb-slate-300 overflow-auto">
          {filteredChaps.map((ch, index) => {
            return (
              <li key={index} className="w-full">
                <Link
                  className={`${
                    ch === currentChapter ? "bg-slate-500" : "bg-slate-700"
                  } flex w-full px-2 py-1 hover:bg-slate-500 items-center justify-between`}
                  href={`/content/${id}/${ch}`}
                >
                  Capitulo {ch}
                  {ch === currentChapter && (
                    <span className="bg-black p-1 rounded-md text-sm">
                      Leyendo
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ChapterSearch;
