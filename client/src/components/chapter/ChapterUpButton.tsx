import { useScrollDirection } from "@/hooks/useScrollDirection";
import { motion } from "framer-motion";
import React from "react";
import { FaChevronUp } from "react-icons/fa";

const ChapterUpButton = () => {
  const direction = useScrollDirection();

  return (
    <motion.button
      onClick={() => window.scrollTo(0, 0)}
      animate={{
        bottom: direction === "down" ? 25 : -100,
      }}
      className="bg-sky-500 fixed bottom-1/4 right-10 xl:right-52 p-3 rounded-md"
    >
      <FaChevronUp size={22} />
    </motion.button>
  );
};

export default ChapterUpButton;
