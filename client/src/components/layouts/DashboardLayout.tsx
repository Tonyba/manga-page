import React, { FC, PropsWithChildren } from "react";
import { DashboardSidebar } from "../sidebars/DashboardSidebar";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex relative">
      <aside className="w-[256px] h-screen border-primary  border-r-2 fixed top-0 left-0 pt-10">
        <DashboardSidebar />
      </aside>
      <div className="flex-1 px-5 ml-[256px]">{children}</div>
    </div>
  );
};

export default DashboardLayout;
