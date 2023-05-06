import React, { FC } from "react";
import ContentChapters from "../content/ContentChapters";
import { ChapterItemType, ContentType } from "@/utils/types";
import ContentSearchItem from "../content/ContentSearchItem";
import ScrollbarBox from "../scrollbarBox/ScrollbarBox";
import { useIsMobile } from "@/hooks/useIsMobile";
import LoadingSpinner from "../chapter/LoadingSpinner";

type Props = {
  data: ChapterItemType[] | ContentType[];
  type: "chapters" | "mangas";
  isLoading?: boolean;
};

const SearchBox: FC<Props> = ({ data, type, isLoading = true }) => {
  const [isMobile] = useIsMobile();

  const mobileStyles = "top-20 mt-5";
  const desktopStyles = "w-full  absolute";

  return (
    <div
      className={`bg-primary rounded-lg ${
        !isMobile ? desktopStyles : mobileStyles
      }  z-20`}
    >
      <SearchBoxInner data={data} type={type} isLoading={isLoading} />
    </div>
  );
};

const SearchBoxInner: FC<Props> = ({ type, data, isLoading }) => {
  return (
    <ScrollbarBox>
      <div className="max-h-72">
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
            <>
              {isLoading && (
                <div className="text-center py-10">
                  <LoadingSpinner />
                </div>
              )}

              {!isLoading && data.length === 0 && (
                <p className="text-center py-10 px-1">
                  No se encontro una Serie con ese titulo.
                </p>
              )}

              {data.map((content) => {
                const manga = content as ContentType;
                return (
                  <div key={manga.id} className="px-5 py-3">
                    <ContentSearchItem {...manga} />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </ScrollbarBox>
  );
};

export default SearchBox;
