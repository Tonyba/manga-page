import React, { FC, PropsWithChildren } from "react";
import { IconType } from "react-icons";

type Props = {
  onClick: () => void;
  textHover: string;
};

const DashboardHoverItem: FC<PropsWithChildren & Props> = ({
  textHover,
  onClick,
  children,
}) => {
  return (
    <button
      className="relative before:content-[attr(data-tip)]
      before:px-3 before:py-1 before:-left-6 b  before:-bottom-10
      before:w-max before:max-w-2xl tooltip-bg-primary before:rounded-md before:opacity-0
      before:transition-all before:absolute hover:before:opacity-100 before:text-sm
      "
      data-tip={textHover}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export default DashboardHoverItem;
