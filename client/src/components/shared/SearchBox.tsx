import React, { FC } from "react";
import ContentChapters from "../content/ContentChapters";

type Props = {
  data: any[];
  type: "chapters" | "mangas";
};

const SearchBox: FC<Props> = ({ data, type }) => {
  return (
    <div className="bg-primary rounded-lg absolute w-full top-16 z-10">
      <div className="grid grid-cols-1 divider-dark divide-y">
        {type === "chapters" ? (
          data.map((d) => (
            <div className="px-5 py-3">
              <ContentChapters {...d} />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
