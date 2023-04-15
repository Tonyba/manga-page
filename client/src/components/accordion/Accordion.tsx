import { motion, AnimatePresence } from "framer-motion";
import React, { FC, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

type Props = {
  title: string;
  content: any;
};

const Accordion: FC<Props> = ({ title, content }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full">
      <div className="bg-primary rounded-md p-2">
        <div
          onClick={() => setShow(!show)}
          className="flex justify-between items-center  cursor-pointer"
        >
          <span className="text-xl font-semibold text-important">{title}</span>
          <BiChevronDown
            className={`transition-all duration-500 ${
              show ? "rotate-180" : ""
            }`}
            size={22}
          ></BiChevronDown>
        </div>

        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ height: 0 }}
              animate={{
                height: "auto",
              }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-clip pt-2"
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Accordion;
