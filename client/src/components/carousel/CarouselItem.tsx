import { motion } from "framer-motion";
import Image from "next/image";
import React, {
  FC,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import ContentPill from "../content/contentPill/ContentPill";
import { useDevideWidth } from "../hooks/useDevideWidth";

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
  const [Dwidth, setDwidth] = useState({
    width: "250px",
    space: itemSpace,
  });
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
        <ContentPill contentType="Manga" isAbsolute={true} />

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
