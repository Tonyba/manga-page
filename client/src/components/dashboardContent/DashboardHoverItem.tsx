import React, { FC, PropsWithChildren } from "react";
import { IconType } from "react-icons";
import Link from "next/link";

type Props = {
  textHover: string;
  link?: string;
  onClick?: () => void;
};

const DashboardHoverItem: FC<PropsWithChildren & Props> = ({
  textHover,
  children,
  link,
  onClick,
}) => {
  return link ? (
    <Link
      href={link}
      className="relative before:content-[attr(data-tip)]
      before:px-3 before:py-1 before:-left-6 b  before:-bottom-10
      before:w-max before:max-w-2xl tooltip-bg-primary before:rounded-md before:opacity-0
      before:transition-all before:absolute hover:before:opacity-100 before:text-sm
      "
      data-tip={textHover}
    >
      {children}
    </Link>
  ) : (
    <button
      className="relative before:content-[attr(data-tip)]
    before:px-3 before:py-1 before:-left-6 b  before:-bottom-10
    before:w-max before:max-w-2xl tooltip-bg-primary before:rounded-md before:opacity-0
    before:transition-all before:absolute hover:before:opacity-100 before:text-sm"
      onClick={() => (onClick ? onClick() : "")}
      data-tip={textHover}
    >
      {children}
    </button>
  );
};

export default DashboardHoverItem;
