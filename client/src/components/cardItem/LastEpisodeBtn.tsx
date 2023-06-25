import Link from "next/link";
import React, { FC } from "react";

type Props = {
  lastChapter?: number;
  id: number;
  fullWidth?: boolean;
};
const styles =
  "mb-5 font-medium w-full text-sm py-1 bg-primary bg-hover text-center rounded-md  px-2";

const LastEpisodeBtn: FC<Props> = ({ lastChapter, id, fullWidth = true }) => {
  return (
    <Link
      href={`/content/${id}/${lastChapter ? `capitulo-${lastChapter}` : ""}`}
      className={styles + ` ${fullWidth ? "block" : ""}`}
    >
      {lastChapter ? `Capitulo ${lastChapter}` : "No hay capitulos"}
    </Link>
  );
};

export default LastEpisodeBtn;
