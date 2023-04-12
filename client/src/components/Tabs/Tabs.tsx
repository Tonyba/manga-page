import { TabItemType } from "@/utils/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { FC, useEffect, useState } from "react";

type Props = {
  tabs?: TabItemType[];
  loading: boolean;
};

const Tabs: FC<Props> = ({ tabs, loading }) => {
  const [selectedTab, setSelectedTab] = useState<TabItemType>();

  useEffect(() => {
    if (!loading) setSelectedTab(tabs![0]);
    console.log(loading ?? tabs![0]);
  }, [loading]);

  return (
    <>
      <nav className="rounded-xl bg-slate-600">
        <ul className="flex">
          {tabs?.map((tab, index) => (
            <li
              key={index}
              className={`w-full text-center font-medium 
              py-3 rounded-xl
              ${selectedTab?.content === tab.content && "bg-slate-500"}
              transition-colors 
              cursor-pointer hover:bg-slate-500`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </nav>

      {selectedTab && (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-3"
          >
            {selectedTab.content}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default Tabs;
