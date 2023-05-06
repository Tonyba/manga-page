import { ChapterContext } from "@/utils/context/ChapterContext";
import { readStyleEnum } from "@/utils/types";
import { FC, useContext } from "react";
import ImageReaderItem from "./ImageReaderItem";

type Props = {
  onImageClick: () => void;
};

const ImagesReader: FC<Props> = ({ onImageClick }) => {
  const { readingStyle, images, currentImage } = useContext(ChapterContext);

  return (
    <>
      {readingStyle === readStyleEnum.cascade ? (
        images.map((img, index) => (
          <div key={index} style={{ all: "unset" }}>
            <ImageReaderItem imgSrc={img} index={index} />
          </div>
        ))
      ) : (
        <div style={{ all: "unset" }}>
          <ImageReaderItem
            imgSrc={images[currentImage]}
            index={currentImage}
            onClick={onImageClick}
          />
        </div>
      )}
    </>
  );
};

export default ImagesReader;
