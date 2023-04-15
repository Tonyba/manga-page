import React, { FC } from "react";

type Props = {
  contentType: string;
  isAbsolute?: boolean;
  full?: boolean;
  className?: string;
};

const ContentPill: FC<Props> = ({
  contentType = "manga",
  isAbsolute = true,
  full = false,
  className,
}) => {
  const absolute = `${isAbsolute ? "left-3 top-3 absolute z-10" : "block"}`;
  const isFull = full && "w-full";
  let contentTypeColor;

  switch (contentType.toLowerCase()) {
    case "manhua":
      contentTypeColor = "bg-manhua";
      break;

    case "manwha":
      contentTypeColor = "bg-manwha";
      break;

    default:
      contentTypeColor = "bg-manga";
      break;
  }

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
       ${contentTypeColor}
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
