import React, { FC, PropsWithChildren } from "react";

const ScrollbarBox: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className=" scrollbar scrollbar-w-[5px] scrollbar-thumb-roundeds scrollbar-thumb-slate-300 overflow-auto">
      {children}
    </div>
  );
};

export default ScrollbarBox;
