import React, { ReactNode, useEffect, useState, useRef } from "react";
import CarouselItem from "./CarouselItem";

import { checkTargetForNewValues, motion } from "framer-motion";

type CarouselOptions = {
  width: number;
  position: number;
};

const Carousel = () => {
  const [options, setOptions] = useState<CarouselOptions>({
    width: 0,
    position: 0,
  });

  const [position, setPosition] = useState(0);
  const carousel = useRef<HTMLDivElement | any>();
  const itemWidth = 247;
  const timeAuto = 3000;

  const handleMouseDown = () => {};

  useEffect(() => {
    const auto = setInterval(() => {
      // console.log(position);
      // setPosition(position + 1);
    }, timeAuto);

    setOptions({
      ...options,
      width: carousel.current.scrollWidth - carousel.current.offsetWidth,
    });

    return () => {
      clearInterval(auto);
    };
  }, []);

  return (
    <div className="cursor-grab overflow-hidden max-h-96">
      <motion.div
        ref={carousel}
        onMouseDown={() => handleMouseDown}
        drag="x"
        animate={{ x: -position }}
        dragConstraints={{ right: 0, left: -options.width }}
        className="flex  gap-4"
      >
        <CarouselItem />
        <CarouselItem />
        <CarouselItem />
        <CarouselItem />
        <CarouselItem />
        <CarouselItem />
        <CarouselItem />
        <CarouselItem />
        <CarouselItem />
        <CarouselItem />
        <CarouselItem />
        <CarouselItem />
        <CarouselItem />
      </motion.div>
    </div>
  );
};

export default Carousel;
