import React, { FC, useContext, useEffect, useState } from "react";
import ChapterSpinner from "../chapter/ChapterSpinner";
import { ChapterContext } from "@/utils/context/ChapterContext";
import { readStyleEnum } from "@/utils/types";

type Props = {
  imgSrc: string;
  index: number;
  onClick?: () => void;
};

const ImageReaderItem: FC<Props> = ({ imgSrc, index, onClick = () => {} }) => {
  const [loadedImg, setLoaded] = useState(false);
  const { readingStyle } = useContext(ChapterContext);

  useEffect(() => {
    loadedImg;
  }, [loadedImg]);

  return (
    <>
      {!loadedImg && <ChapterSpinner />}
      <img
        src={imgSrc}
        className={`mx-auto ${
          readingStyle === readStyleEnum.page && "cursor-pointer"
        }`}
        alt={`image-${index}`}
        onLoad={() => setLoaded(true)}
        onClick={() => {
          if (readingStyle === readStyleEnum.page) onClick();
        }}
      />
    </>
  );
};

export default ImageReaderItem;
