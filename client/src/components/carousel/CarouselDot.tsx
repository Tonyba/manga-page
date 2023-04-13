import React, { FC } from "react";

type Props = {
  position: number;
  onClickDot: (position: number) => void;
  currentPosition: number;
};

export const CarouselDot: FC<Props> = ({
  position,
  onClickDot,
  currentPosition,
}) => {
  return (
    <span
      onClick={() => onClickDot(position)}
      className={`${
        currentPosition === position ? "bg-white" : "bg-slate-700"
      }  h-3 w-3 rounded-full cursor-pointer `}
    ></span>
  );
};
