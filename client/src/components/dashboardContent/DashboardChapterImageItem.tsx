import { AddChapterContext } from "@/utils/context/AddChapterContext";
import { DragImageItemType } from "@/utils/types";
import React, { FC, useContext, useEffect } from "react";
import { useDrag } from "react-dnd";
import { FaTimes } from "react-icons/fa";

type Props = {
  dragItem: DragImageItemType;
  onItemDrag: (item: DragImageItemType) => void;
  index: number;
  imgSrc: string;
};



const DashboardChapterImageItem: FC<Props> = ({ dragItem, onItemDrag, index, imgSrc }) => {
  const { onRemoveImage } = useContext(AddChapterContext);

  const { id } = dragItem;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: () => ({ ...dragItem }),
    end: (item, monitor) => {
      onItemDrag({ ...item });
    },

    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      className={`relative ${!isDragging ? "cursor-grab" : "cursor-grabbing"} `}
      ref={drag}
    >
      <button
        type="button"
        onClick={() => onRemoveImage(dragItem)}
        className={"bg-primary bg-hover p-1 absolute top-0 right-0"}
      >
        <FaTimes size={18} />
      </button>

      <img src={imgSrc} width={300} height={300} />
      <p className="text-center mt-3">{index + 1}</p>
    </div>
  );
};

export default DashboardChapterImageItem;
