import React, { FC, PropsWithChildren, useEffect } from "react";
import { useDrop } from "react-dnd";
import { DragDropItemType } from "./DashboardChapterImageItem";

type Props = {
  id: string;
  getContainerId: (id: string) => void;
  
};

const ChapterImagePreviewWrapper: FC<PropsWithChildren & Props> = ({
  children,
  id,
  getContainerId,
}) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "image",
    drop: (item: DragDropItemType, monitor) => {
      getContainerId(id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className={`${isOver ? "bg-important" : ""}`} ref={dropRef}>
      {children}
    </div>
  );
};

export default ChapterImagePreviewWrapper;
