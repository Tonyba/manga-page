import React, { FC } from "react";
import { ContentType } from "@/utils/types";
import { motion, AnimatePresence } from "framer-motion";
import CardItem from "../cardItem/CardItem";
import ListItem from "../listItem/ListItem";

type Props = {
  items: ContentType[];
  oneCol?: boolean;
  showDesc?: boolean;
  action?: "add" | "remove";
  loading?: boolean;
  skeletonCount?: number;
  fourCols?: boolean;
  itemType?: "list" | "card";
};

const CardLoop: FC<Props> = ({
  items,
  showDesc = true,
  fourCols = false,
  oneCol = false,
  itemType = "card",
}) => {
  let cols = fourCols ? "xl:grid-cols-4" : "xl:grid-cols-6";
  cols += " grid-cols-2 sm:grid-cols-3 md:grid-cols-4";

  if (oneCol) {
    cols = "grid-cols-1 divide-y divide-slate-600";
  }

  return (
    <motion.div
      layout
      className={`
        grid
        ${cols}
        gap-4`}
    >
      <AnimatePresence>
        {items.map((item, index) => {
          return itemType === "card" ? (
            <CardItem
              key={index}
              content={item}
              index={index}
              showHover={showDesc}
              action="add"
            />
          ) : (
            <ListItem key={index} {...item} />
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

export default CardLoop;
