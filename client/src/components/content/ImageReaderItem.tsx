import React, { FC, useContext, useEffect, useState } from "react";
import LoadingSpinner from "../chapter/LoadingSpinner";
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
      {!loadedImg && (
        <div className="h-[800px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
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
