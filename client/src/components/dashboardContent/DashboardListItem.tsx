import Image from "next/image";
import React from "react";
import ContentPill from "../content/ContentPill";

export const DashboardListItem = () => {
  return (
    <div className="flex bg-primary-dark-hover">
      <div className="pl-2 pr-4">
        <input type="checkbox" />
      </div>

      <div className="pl-2 pr-4 flex gap-5">
        <Image
          src={"https://picsum.photos/120/68"}
          alt="item"
          width={120}
          height={68}
        />

        <div>
          <span>Contenido aca</span>
          <p className="text-sm font-light text-dark">mas contenido aca</p>
        </div>
      </div>

      <div className="pl-2 pr-4 text-sm">100</div>

      <div className="pl-2 pr-4 text-sm">12/04/2023</div>

      <div className="pl-2 pr-4 text-sm">
        <ContentPill contentType="manga" isAbsolute={false} />
      </div>

      <div className="pl-2 pr-4">1230</div>

      <div className="pl-2 pr-4">1242145</div>
    </div>
  );
};
