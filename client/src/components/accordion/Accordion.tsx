import { motion, AnimatePresence } from "framer-motion";
import React, { FC, PropsWithChildren, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

type Props = {
  title: string;
};

const Accordion: FC<Props & PropsWithChildren> = ({ title, children }) => {
  const [show, setShow] = useState<boolean>(false);

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
          <motion.div
            initial={{
              height: 0,
              paddingTop: 0,
            }}
            animate={{
              height: !show ? 0 : "auto",
              paddingTop: !show ? 0 : "8px",
            }}
            transition={{ duration: 0.3 }}
            className={`${!show ? "overflow-hidden" : ""}`}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Accordion;
