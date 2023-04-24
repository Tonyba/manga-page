import React, { FC } from "react";

type Props = {
  genre: string;
};

const GenreItem: FC<Props> = ({ genre }) => {
  return (
    <span className="bg-accent bg-accent-hover cursor-pointer p-1 px-2 rounded-lg">
      {genre}
    </span>
  );
};

export default GenreItem;
