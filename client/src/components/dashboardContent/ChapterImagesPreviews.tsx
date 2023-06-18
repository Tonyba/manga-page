import React, { useContext, useEffect, useState } from "react";
import DashboardChapterImageItem from "./DashboardChapterImageItem";
import { AddChapterContext } from "@/utils/context/AddChapterContext";
import { motion } from "framer-motion";
import { ImageType } from "@/utils/types";

const ChapterImagesPreviews = () => {
  const { fileItems, setFileItems } = useContext(AddChapterContext);
  const [sourceItem, setSource] = useState<ImageType>();
  const [targetItem, setTarget] = useState<ImageType>();

  const getContainerId = (index: ImageType) => {
    setSource(index);
  };

  useEffect(() => {
    if (sourceItem != undefined && targetItem != undefined) {
      swapItems(sourceItem, targetItem);
    }
  }, [targetItem?.id, sourceItem?.id]);

  const swapItems = (
    sourceItemParam: ImageType,
    targetItemParam: ImageType
  ) => {
    if (sourceItemParam.id == targetItemParam.id) return;
    let newOrder = [...fileItems];

    const sourceIndex = newOrder.findIndex((i) => i.id === sourceItemParam.id);
    const targetIndex = newOrder.findIndex((i) => i.id === targetItemParam.id);



    [newOrder[targetIndex], newOrder[sourceIndex]] = [
      newOrder[sourceIndex],
      newOrder[targetIndex],
    ];

    newOrder = newOrder.map((item, i) => ({
      ...item,
      url: URL.createObjectURL(item.file!),
      position: i,
    }));

    setFileItems(newOrder);
    setSource(undefined);
    setTarget(undefined);
  };

  const onItemDrag = (item: ImageType) => {
    setTarget(item);
  };

  return (
    <motion.div layout className="mt-5 grid grid-cols-6 gap-5">
      {fileItems.map((cont, i) => (
        <DashboardChapterImageItem
          key={cont.id}
          item={cont}
          getContainerId={getContainerId}
          onItemDrag={onItemDrag}
        />
      ))}
    </motion.div>
  );
};

export default ChapterImagesPreviews;
