import React, { FC, PropsWithChildren } from "react";
import { DashboardSidebar } from "../sidebars/DashboardSidebar";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex">
      <aside className="w-[256px] h-screen border-primary  border-r-2">
        <DashboardSidebar />
      </aside>
      <div className="flex-1 px-5">{children}</div>
    </div>
  );
};

export default DashboardLayout;
