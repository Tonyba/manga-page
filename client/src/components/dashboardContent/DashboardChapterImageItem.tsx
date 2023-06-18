import { AddChapterContext } from "@/utils/context/AddChapterContext";
import { ImageType } from "@/utils/types";
import { motion } from "framer-motion";
import React, { FC, useContext, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FaTrash } from "react-icons/fa";
import { FiMove } from "react-icons/fi";

type Props = {
  getContainerId: (item: ImageType) => void;
  item: ImageType;
  onItemDrag: (item: ImageType) => void;
};

const DashboardChapterImageItem: FC<Props> = ({
  item,
  getContainerId,
  onItemDrag,
}) => {
  const { onRemoveImage } = useContext(AddChapterContext);
  const { position, url, file } = item;

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "image",
    item: () => ({ ...item }),
    end: (dragItem, monitor) => {
      onItemDrag({ ...dragItem });
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "image",
    drop: (dragItem: ImageType, monitor) => {
      getContainerId(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    // <AnimatePresence mode="wait">
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className={`${isDragging ? "cursor-grabbing" : "cursor-grab"} `}
      ref={dropRef}
    >
      <div ref={dragRef}>
        <div
          className={`flex justify-between items-center ${
            isOver ? "bg-important" : "bg-primary"
          }  px-2 py-1`}
        >
          <span className="inline-flex items-center gap-1">
            <FiMove size={18} />
            <p className="text-sm font-semibold">Pag: {position + 1}</p>
          </span>

          <button
            type="button"
            onClick={() => onRemoveImage(position)}
            className={"bg-hover p-1 top-0 right-5 text-red-500 rounded-full"}
          >
            <FaTrash size={16} />
          </button>
        </div>

        <img
          src={url}
          width={300}
          height={240}
          draggable={false}
          className="object-cover bg-primary max-h-60"
        />
        <p
          className={`flex justify-between items-center ${
            isOver ? "bg-important" : "bg-primary"
          } px-2 text-sm py-[3px] line-clamp-1 text-ellipsis`}
        >
          {file?.name}
        </p>
      </div>
    </motion.div>
    // </AnimatePresence>
  );
};

export default DashboardChapterImageItem;
