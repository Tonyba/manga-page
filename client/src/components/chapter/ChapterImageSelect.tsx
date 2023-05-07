import React, { useContext, useEffect, useState } from "react";
import Select from "../select/Select";
import { ChapterContext } from "@/utils/context/ChapterContext";
import { OptionType } from "@/utils/types";

const ChapterImageSelect = ({}) => {
  const { setCurrentImage, images, currentImage } = useContext(ChapterContext);
  const [total, setTotal] = useState<OptionType[]>([]);

  useEffect(() => {
    if (images.length > 0) {
      const arr: OptionType[] = [];
      for (let index = 0; index < images.length; index++) {
        arr.push({
          value: index.toString(),
          label: (index + 1).toString(),
        });
      }

      setTotal(arr);
    }
  }, [images.length]);

  return (
    <div className="flex gap-3 items-center">
      <button
        className="text-2xl"
        onClick={() =>
          currentImage - 1 >= 0 && setCurrentImage(currentImage - 1)
        }
      >
        {"<"}
      </button>
      <Select
        defaultValue={{
          value: currentImage.toString(),
          label: currentImage.toString(),
        }}
        options={total}
        onChange={(val) => setCurrentImage(parseInt(val))}
      />
      <button
        onClick={() =>
          currentImage + 1 < images.length && setCurrentImage(currentImage + 1)
        }
        className="text-2xl"
      >
        {">"}
      </button>
    </div>
  );
};

export default ChapterImageSelect;
