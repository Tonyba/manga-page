import React, { useEffect, useState, useRef, useCallback } from "react";
import CarouselItem from "./CarouselItem";
import { motion } from "framer-motion";

import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import CarouselButton from "./CarouselButton";

type CarouselOptions = {
  width?: number;
  position: number;
  itemsPerPage: number;
  itemSpace: number;
  itemWidth: number;
  itemHeight: number;
};

const slides = [
  "https://picsum.photos/250/333",
  "https://picsum.photos/250/333",
  "https://picsum.photos/250/333",
  "https://picsum.photos/250/333",
  "https://picsum.photos/250/333",
  "https://picsum.photos/250/333",
  "https://picsum.photos/250/333",
  "https://picsum.photos/250/333",
  "https://picsum.photos/250/333",
  "https://picsum.photos/250/333",
  "https://picsum.photos/250/333",
];

const Carousel = () => {
  const [ops, setOpts] = useState<CarouselOptions>({
    width: 0,
    position: 0,
    itemWidth: 250,
    itemHeight: 250,
    itemsPerPage: 5,
    itemSpace: 10,
  });
  const [interval, setIntervalCarousel] = useState<NodeJS.Timer | null>();
  const autoDuration = 3500;
  const [auto, setAuto] = useState(true);
  const carousel = useRef<any>();
  const onRight = useCallback(() => {
    if (ops.position < slides.length - ops.itemsPerPage) {
      setOpts({ ...ops, position: ops.position + 1 });
    } else {
      setOpts({ ...ops, position: 0 });
    }
  }, [ops.position]);

  useEffect(() => {
    setOpts({
      ...ops,
      width: carousel.current?.scrollWidth - carousel.current?.offsetWidth,
      itemHeight: ops.itemWidth / (16 / ops.itemSpace),
    });
  }, []);

  useEffect(() => {
    setIntervalCarousel(
      setInterval(() => {
        if (auto) onRight();
      }, autoDuration)
    );

    return () =>
      clearInterval(interval ? interval : setInterval(() => {}, 1000));
  }, [ops.position, auto, setIntervalCarousel]);

  const onLeft = () => {
    if (ops.position > 0) {
      setOpts({ ...ops, position: ops.position - 1 });
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setAuto(false);
        clearInterval(interval ? interval : setInterval(() => {}, 1000));
        setIntervalCarousel(null);
      }}
      onMouseLeave={() => {
        setAuto(true);
        setIntervalCarousel(
          setInterval(() => {
            if (auto) onRight();
          }, autoDuration)
        );
      }}
    >
      <CarouselButton onClickE={onLeft} position="left">
        <FaChevronLeft />
      </CarouselButton>

      <CarouselButton onClickE={onRight} position="right">
        <FaChevronRight />
      </CarouselButton>

      <div className="overflow-hidden w-full mt-5">
        <motion.div
          ref={carousel}
          className={`flex pb-3]`}
          animate={{
            x: -(ops.position * (ops.itemWidth + ops.itemSpace)),
          }}
          dragConstraints={{
            right: 0,
            left: ops.width && -ops.width,
          }}
        >
          {slides.map((s, index) => (
            <CarouselItem
              key={index}
              position={index}
              src={s}
              itemWidth={ops.itemWidth}
              itemHeight={ops.itemHeight}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Carousel;
