import React, { FC, useEffect, useRef } from "react";
import { BsFillBookmarksFill } from "react-icons/bs";

type Props = {
  type: "Manga" | "Manhwa" | "Manhua";
  count: number;
};

const MangaCountItem: FC<Props> = ({ type, count }) => {
  const itemType = useRef<string>(type);

  switch (itemType.current) {
    case "Manga":
      itemType.current = "bg-manga";
      break;

    case "Manhwa":
      itemType.current = "bg-manwha";
      break;

    case "Manhua":
      itemType.current = "bg-manhua";
      break;
  }

  return (
    <div className={`${itemType.current} p-5 rounded-md flex justify-between`}>
      <BsFillBookmarksFill size={48} />
      <div className="text-right">
        <span className="font-semibold text-4xl">{count}</span>
        <h2 className="text-2xl font-semibold">{type}</h2>
      </div>
    </div>
  );
};

export default MangaCountItem;
