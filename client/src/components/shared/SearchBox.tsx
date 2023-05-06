import React, { FC } from "react";
import ContentChapters from "../content/ContentChapters";
import { ChapterItemType, ContentType } from "@/utils/types";
import ContentSearchItem from "../content/ContentSearchItem";
import ScrollbarBox from "../scrollbarBox/ScrollbarBox";
import { useIsMobile } from "@/hooks/useIsMobile";

type Props = {
  data: ChapterItemType[] | ContentType[];
  type: "chapters" | "mangas";
};

const SearchBox: FC<Props> = ({ data, type }) => {
  const [isMobile] = useIsMobile();

  const mobileStyles = "top-20 mt-5";
  const desktopStyles = "w-full  absolute";

  return (
    <div
      className={`bg-primary rounded-lg ${
        !isMobile ? desktopStyles : mobileStyles
      }  z-20`}
    >
      <SearchBoxInner data={data} type={type} />
    </div>
  );
};

const SearchBoxInner: FC<Props> = ({ type, data }) => {
  return (
    <ScrollbarBox>
      <div className="max-h-72">
        <div className="grid grid-cols-1 divider-dark divide-y">
          {type === "chapters"
            ? data.map((d, index) => {
                const ch = d as ChapterItemType;

                return (
                  <div key={ch.id} className="px-5 py-3">
                    <ContentChapters {...ch} />
                  </div>
                );
              })
            : data.map((content) => {
                const manga = content as ContentType;
                return (
                  <div key={manga.id} className="px-5 py-3">
                    <ContentSearchItem {...manga} />
                  </div>
                );
              })}
        </div>
      </div>
    </ScrollbarBox>
  );
};

export default SearchBox;
