import { ContentResponseType } from "@/utils/types";
import Image from "next/image";
import React, { FC } from "react";
import ContentPill from "../content/ContentPill";
import GenreItem from "../content/GenreItem";

type Props = {
  content?: ContentResponseType;
};

const DashboardAddChapterSide: FC<Props> = ({ content }) => {
  return (
    <div className="bg-primary rounded-md p-5 flex flex-col gap-2">
      <Image
        alt={content?.manga.title!}
        className="w-full max-h-80 object-cover"
        width={300}
        height={300}
        src={content?.manga.image as string}
      />

      <h2 className="text-center font-semibold text-xl">
        {content?.manga.title}
      </h2>

      <div className="divide-y divider-dark">
        <div className="flex items-center justify-between py-3">
          <span>Capitulos</span>
          <span>{content?.numEpisodes}</span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span>Tipo</span>
          <ContentPill contentType={content?.manga.type!} isAbsolute={false} />
        </div>
        <div className="flex items-center justify-between py-3">
          <span>Demografia</span>
          <span>{content?.manga.demography}</span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span>Estado</span>
          <span>{content?.manga.status}</span>
        </div>
        <div className="flex flex-wrap items-center justify-between py-3">
          <span>Generos</span>
          <div className="flex gap-3">
            {content?.manga.genres.map((g, index) => (
              <GenreItem key={index} genre={g} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAddChapterSide;
