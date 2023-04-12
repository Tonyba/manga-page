import React, { FC } from "react";

type Props = {
  contentType: string;
  isAbsolute?: boolean;
  full?: boolean;
  className?: string;
};

const ContentPill: FC<Props> = ({
  contentType,
  isAbsolute = true,
  full = false,
  className,
}) => {
  const absolute = `${isAbsolute ? "left-3 top-3 absolute z-10" : "block"}`;
  const isFull = full && "w-full";

  return (
    <span
      className={`
      text-white
        text-[12px] font-semibold
        left-3
        top-3
        text-center
        ${className}
        uppercase
        rounded-[5px]
        bg-${contentType.toLocaleLowerCase()}
        p-[3px]
        ${isFull}
        bg-red-500
        ${absolute}
    `}
    >
      MANGA
    </span>
  );
};

export default ContentPill;
