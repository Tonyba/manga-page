import React, { FC, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ContentType } from "@/utils/types";
import { motion } from "framer-motion";
import ContentPill from "../content/ContentPill";
import CardItemHover from "./CardItemHover";
import CardAction from "./CardAction";
import { useAppContext } from "@/utils/context/AppContext";

type Props = {
  content: ContentType;
  index: number;
  action?: "add" | "remove";
  showHover?: boolean;
  inCarousel?:boolean
};

const CardItem: FC<Props> = ({ content, showHover = true, action = "add", inCarousel = false}) => {
  const { type, id, title, demography, description, image, lastChapter } =
    content;
  const { user } = useAppContext();

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      layout
      className="mb-5 text-center relative group"
    >
      {user && <CardAction action={action} contentId={id} />}
      <Link
        className="text-center mb-3"
        href={`/content/${id}`}
        // href={{
        //   pathname: "/content/[id]",
        //   query: { mangaId: 22 },
        // }}
        // as={`/content/${22}`}
      >
        <div className="relative overflow-hidden  rounded-lg ">
          <ContentPill contentType={type} />
          <Image
            src={image as string}
            className={`object-cover rounded-lg  
          w-full
          cursor-pointer hover:scale-110
          duration-300
          ${ inCarousel ? 'h-96' : 'h-60' }
          md:h-80
          hover:brightness-110`}
            alt={title}
            width={250}
            height={330}
          />

          <div
            className="text-white absolute 
        bottom-0 h-10 flex items-center 
        w-full justify-center font-medium
        bg-[#00000080]"
          >
            <p className="text-lg">{demography}</p>
          </div>
        </div>
      </Link>

      { !inCarousel && <Link
        href={`/content/${id}/${lastChapter ? `capitulo-${lastChapter}` : `` }`}
        role="button"
        className="absolute z-10 right-2 top-1/2 rounded-md
        px-2
        p-1 text-sm bg-[#475569da] block xl:hidden"
      >
         {lastChapter ? `Cap ${lastChapter}` : `No Caps` }
      </Link> }
      

      <Link href={`/content/${id}`}>
        <h3 className="text-xl font-medium line-clamp-2 mt-1 break-words">
          {title}
        </h3>
      </Link>

      {showHover && (
        <CardItemHover
          id={id}
          title={title}
          desc={description}
          type={type}
          lastChapter={lastChapter}
        />
      )}
    </motion.div>
  );
};

export default CardItem;
