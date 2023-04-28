import React, { useContext, useEffect, useState } from "react";
import DashboardChapterImageItem from "./DashboardChapterImageItem";
import { AddChapterContext } from "@/utils/context/AddChapterContext";
import { motion } from "framer-motion";
import { DragImageItemType } from "@/utils/types";

const ChapterImagesPreviews = () => {
  const { fileItems, setFileItems } = useContext(AddChapterContext);
  const [sourceItem, setSource] = useState<DragImageItemType>();
  const [targetItem, setTarget] = useState<DragImageItemType>();

  const getContainerId = (index: DragImageItemType) => {
    setSource(index);
  };

  useEffect(() => {
    if (sourceItem != undefined && targetItem != undefined) {
      swapItems(sourceItem, targetItem);
    }
  }, [targetItem?.id, sourceItem?.id]);

  const swapItems = (
    sourceItemParam: DragImageItemType,
    targetItemParam: DragImageItemType
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
      imgSrc: URL.createObjectURL(item.file),
      pag: i,
    }));

    setFileItems(newOrder);
    setSource(undefined);
    setTarget(undefined);
  };

  const onItemDrag = (item: DragImageItemType) => {
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
