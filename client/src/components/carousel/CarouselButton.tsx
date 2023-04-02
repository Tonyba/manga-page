import React, { FC, PropsWithChildren } from "react";

type Props = {
  position: "left" | "right";
  onClickE: () => void;
};

const CarouselButton: FC<PropsWithChildren & Props> = ({
  position,
  onClickE,
  children,
}) => {
  return (
    <button
      className={`text-white 
        absolute top-1/2 z-10 ${position === "left" ? "-left-5" : "-right-5"}  
        -translate-y-1/2 bg-slate-700 p-2 
        rounded-full
        `}
      onClick={onClickE}
    >
      {children}
    </button>
  );
};

export default CarouselButton;
