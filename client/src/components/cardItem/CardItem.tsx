import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { ContentType } from "@/utils/types";
import { motion } from "framer-motion";
import ContentPill from "../content/contentPill/ContentPill";
import CardItemHover from "./CardItemHover";

type Props = {
  content: ContentType;
  index: number;
  action: "add" | "remove";
  showHover: boolean;
};

const CardItem: FC<Props> = ({ content, showHover }) => {
  const { contentType, id, title, demography, description, image } = content;

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      layout
      className="mb-5 text-center relative group"
    >
      <div className="relative text-center rounded-lg overflow-hidden mb-3">
        <ContentPill contentType={"MANGA"} />
        <Image
          src={"https://picsum.photos/250/300"}
          className="object-cover rounded-lg  
          w-full
          cursor-pointer hover:scale-110
          duration-300
          h-80
          hover:brightness-110"
          alt={title}
          width={250}
          height={330}
        />

        <button
          className="absolute z-10 right-2 bottom-14 rounded-md
        px-2
        p-1 text-sm bg-[#475569da] block xl:hidden"
        >
          Cap 23
        </button>

        <div
          className="text-white absolute 
        bottom-0 h-10 flex items-center 
        w-full justify-center font-medium
        bg-[#00000080]"
        >
          <p className="text-xl">slide</p>
        </div>
      </div>

      <h3 className="text-xl font-medium line-clamp-2">{title}</h3>

      {showHover && (
        <CardItemHover title={title} desc={description} type={contentType} />
      )}
    </motion.div>
  );
};

export default CardItem;
