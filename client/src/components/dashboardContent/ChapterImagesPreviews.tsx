import React, { ChangeEvent, InputHTMLAttributes, useContext, useEffect, useRef, useState } from "react";
import DashboardChapterImageItem from "./DashboardChapterImageItem";
import { AddChapterContext } from "@/utils/context/AddChapterContext";
import { motion } from "framer-motion";
import { ImageType } from "@/utils/types";

const ChapterImagesPreviews = () => {
  const { fileItems, setFileItems } = useContext(AddChapterContext);
  const [currentImageEdited, setEdited] = useState<ImageType>();
  const [sourceItem, setSource] = useState<ImageType>();
  const [targetItem, setTarget] = useState<ImageType>();
  const hiddenInput = useRef<HTMLInputElement>(null);

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
      url: item.file ? URL.createObjectURL(item.file!) : item.url,
      position: i,
    }));

    setFileItems(newOrder);
    setSource(undefined);
    setTarget(undefined);
  };

  const onItemDrag = (item: ImageType) => {
    setTarget(item);
  };

  const onClickReplaceImage = (itemPosition: number) => {
    hiddenInput.current?.click();
    const found = fileItems.find(fi => fi.position === itemPosition);
    setEdited( found );
  }

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement> ) => {
    if(!e.target.files?.length) return; 
    const file = Array.from(e.target.files)[0];
    setFileItems(fileItems.map(fi => fi.id === currentImageEdited?.id ? {...fi, file, url: URL.createObjectURL(file)} : fi));
  }

  return (
    <motion.div layout className="mt-5 grid grid-cols-6 gap-5">
      {fileItems.map((cont, i) => (
        <DashboardChapterImageItem
          key={cont.id}
          item={cont}
          getContainerId={getContainerId}
          onItemDrag={onItemDrag}
          onImageReplace={onClickReplaceImage}
        />
      ))}
      <input ref={hiddenInput} type="file" style={{display: 'none'}} onChange={onChangeImage} accept="image/*"/>
    </motion.div>
  );
};

export default ChapterImagesPreviews;
