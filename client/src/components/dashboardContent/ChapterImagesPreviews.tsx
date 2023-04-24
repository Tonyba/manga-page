import React, { FC, useContext, useEffect, useRef, useState } from "react";
import DashboardChapterImageItem, {
  DragDropItemType,
} from "./DashboardChapterImageItem";
import { AddChapterContext } from "@/utils/context/AddChapterContext";
import ChapterImagePreviewWrapper from "./ChapterImagePreviewWrapper";
import { DragImageItemType } from "@/utils/types";

const ChapterImagesPreviews = () => {
  const { previews, setFiles, files, setPreviews, fileItems } =
    useContext(AddChapterContext);
  const [targetId, setartgetId] = useState<number>();
  const [source, setSource] = useState<DragDropItemType>();

  const getContainerId = (id: string) => {
    const container = [...fileItems].find(item => item.id === id);
    setSource(container);
  };

  useEffect(() => {
    if (source != undefined && targetId != undefined) {
      swapItems(source, targetId);
    }
  }, [targetId, source]);

  const onItemDrag = (item: DragDropItemType) => {
    setartgetId(item.index);
  };

  const swapItems = (sourcefile: DragImageItemType, targetFile: DragImageItemType) => {
    let newOrder = [...files];
  
    [newOrder[from], newOrder[to]] = [newOrder[to], newOrder[from]];

    // let temp = newOrder[from];
    // newOrder[from] = newOrder[to];
    // newOrder[to] = temp;
    const imagesArray = newOrder.map((f) => {
      return URL.createObjectURL(f);
    });

    console.log(newOrder);

    setFiles(files);
    setPreviews(imagesArray);
  };

  return (
    <div className="grid grid-cols-6 gap-10 mt-10">
      {previews.map((cont, i) => (
        <ChapterImagePreviewWrapper
          key={i}
          id={i}
          getContainerId={getContainerId}
        >
          <DashboardChapterImageItem
            key={i}
            dragItem={{ imgSrc: cont, index: i }}
            onItemDrag={onItemDrag}
          />
        </ChapterImagePreviewWrapper>
      ))}
    </div>
  );
};

export default ChapterImagesPreviews;
