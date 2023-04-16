import React from "react";
import { DashboardListItem } from "./DashboardListItem";

const ContentList = () => {
  return (
    <>
      <div className="flex items-center gap-3 mb-5">
        <h1 className="font-semibold text-3xl">Contenido</h1>
        <button className="text-important button-primary-outline text-sm border border-button p-2 py-1 rounded-sm">
          Agregar
        </button>
      </div>

      <div className="grid grid-cols-1 divide-y divider-primary [&>*]:py-3">
        <DashboardListItem />
        <DashboardListItem />
        <DashboardListItem />
      </div>
    </>
  );
};

export default ContentList;
