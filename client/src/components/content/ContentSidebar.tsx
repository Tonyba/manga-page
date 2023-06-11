import React, { FC } from "react";
import ContentPill from "./ContentPill";
import GenreItem from "./GenreItem";

type Props = {
  contentType: string;
  genres: string[];
  status: string;
  demography: string;
};

const ContentSidebar: FC<Props> = ({
  contentType,
  genres,
  status,
  demography,
}) => {
  return (
    <>
      <div className="mb-5">
        <span className="text-important font-semibold text-xl block mb-3">
          Tipo
        </span>
        <ContentPill className="w-40" contentType={contentType} isAbsolute={false} />
      </div>
      <div className="mb-5">
        <span className="font-semibold text-important text-xl block mb-1">
          Demografia
        </span>
        <span className="text-lg font-medium">{demography}</span>
      </div>
      <div className="mb-5">
        <span className="font-semibold text-important text-xl block mb-3">
          Generos
        </span>
        <div className="flex flex-wrap gap-3">
          {genres.map((g, index) => (
            <GenreItem key={index} genre={g} />
          ))}
        </div>
      </div>
      <div className="mb-5">
        <span className="font-semibold text-important text-xl block mb-1">
          Estado
        </span>
        <span className="text-lg font-medium">{status}</span>
      </div>
    </>
  );
};

export default ContentSidebar;
