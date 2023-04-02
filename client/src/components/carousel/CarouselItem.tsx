import { motion } from "framer-motion";
import Image from "next/image";
import React, { FC } from "react";

type Props = {
  src: string;
  itemWidth: number;
  itemHeight?: number;
  itemSpace?: number;
  dragging: boolean;
};

const CarouselItem: FC<Props> = ({
  src,
  itemWidth,
  itemHeight = 333,
  itemSpace = 10,
  dragging = false,
}) => {
  return (
    <motion.div
      style={{
        width: itemWidth,
        marginRight: itemSpace,
      }}
      className={`relative inline-block 
        cursor-pointer 
        transition-all origin-bottom-left
        shrink-0
        rounded-full
        `}
    >
      <div className="overflow-hidden rounded-lg">
        <div
          className="
        absolute text-white
        text-[12px] font-semibold
        left-3
        top-3
        rounded-[5px]
        p-[3px]
        bg-red-500
        z-10
        "
        >
          MANGA
        </div>

        <Image
          src={src}
          alt="whatever"
          className={`
          object-cover 
          rounded-lg
          ${dragging ? "pointer-events-none" : ""}
          hover:scale-110
          duration-300
          hover:brightness-110
          `}
          width={itemWidth}
          height={itemHeight}
          draggable={false}
        />
      </div>
      <div
        className="text-white absolute 
      bottom-0 h-10 flex items-center 
      w-full justify-center font-medium
      bg-[#00000080]"
      >
        <p className="text-xl">slide</p>
      </div>
    </motion.div>
  );
};

export default CarouselItem;
