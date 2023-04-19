import { ContentType } from "@/utils/types";
import React, { FC } from "react";
import ContentPill from "./ContentPill";

type Props = {
  contentType: string;
  genres: string[];
  status: string;
};

const ContentSidebar: FC<Props> = ({ contentType, genres, status }) => {
  return (
    <>
      <div className="mb-5">
        <span className="text-important font-semibold text-xl block mb-3">
          Tipo
        </span>
        <ContentPill className="w-40" contentType="Manga" isAbsolute={false} />
      </div>
      <div className="mb-5">
        <span className="font-semibold text-important text-xl block mb-3">
          Generos
        </span>
        <div className="flex flex-wrap gap-3">
          {genres.map((g, index) => (
            <span
              key={index}
              className="bg-accent bg-accent-hover cursor-pointer p-1 px-2 rounded-lg"
            >
              {g}
            </span>
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
