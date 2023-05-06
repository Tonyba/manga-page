import { motion } from "framer-motion";
import Image from "next/image";
import React, { FC, useState } from "react";
import ContentPill from "../content/ContentPill";
import { useDevideWidth } from "../../hooks/useDevideWidth";
import Link from "next/link";

type Props = {
  src: string;
  itemWidth: number;
  itemHeight?: number;
  itemSpace?: number;
  dragging: boolean;
  id: number;
  title: string;
  type: string;
};

const CarouselItem: FC<Props> = ({
  src,
  itemWidth,
  itemHeight = 333,
  itemSpace = 10,
  dragging = false,
  id,
  title,
  type = "Manga",
}) => {
  const [width, space] = useDevideWidth(itemSpace);

  return (
    <motion.div
      style={{
        width: width,
        marginRight: space,
      }}
      className={`relative inline-block 
        cursor-pointer 
        transition-all origin-bottom-left
        shrink-0
        rounded-full
        w-[250px]
        `}
    >
      <div className="overflow-hidden rounded-lg">
        <ContentPill contentType={type} isAbsolute={true} />
        <Link href={`/content/${id}`} draggable={false}>
          <Image
            src={src}
            alt="whatever"
            className={`
          object-cover 
          rounded-lg
          w-full
          h-full
          ${dragging ? "pointer-events-none" : ""}
          hover:scale-110
          duration-300
          hover:brightness-110
          `}
            width={itemWidth}
            height={itemHeight}
            draggable={false}
          />
        </Link>
      </div>
      <div
        className="text-white 
        absolute
      bottom-0 h-10 flex items-center 
      w-full justify-center font-medium
      bg-[#00000080] px-2 "
      >
        <Link
          href={`/content/${id}`}
          className="text-lg w-full line-clamp-1 text-center text-ellipsis"
        >
          {title}
        </Link>
      </div>
    </motion.div>
  );
};

export default CarouselItem;
