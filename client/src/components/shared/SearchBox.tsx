import React, { FC } from "react";
import ContentChapters from "../content/ContentChapters";
import { ChapterItemType, ContentType } from "@/utils/types";

type Props = {
  data: ChapterItemType[] | ContentType[];
  type: "chapters" | "mangas";
};

const SearchBox: FC<Props> = ({ data, type }) => {
  return (
    <div className="bg-primary rounded-lg absolute w-full top-16 z-10">
      <div className="grid grid-cols-1 divider-dark divide-y">
        {type === "chapters" ? (
          data.map((d, index) => {
            const ch = d as ChapterItemType;

            return (
              <div key={ch.id} className="px-5 py-3">
                <ContentChapters {...ch} />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
