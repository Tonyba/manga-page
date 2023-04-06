import React, { useEffect, useState, useRef, useCallback } from "react";
import CarouselItem from "./CarouselItem";
import { motion } from "framer-motion";

import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import CarouselButton from "./CarouselButton";

import { useSwipeable } from "react-swipeable";
import { CarouselDot } from "./CarouselDot";
import { useDevideWidth } from "../hooks/useDevideWidth";

type CarouselOptions = {
  width?: number;
  position: number;
  itemsPerPage: number;
  itemSpace: number;
  itemWidth: number;
  itemHeight: number;
  dragging: boolean;
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
    dragging: false,
  });
  const autoDuration = 3500;
  let slideInterval: NodeJS.Timer;
  const [auto, setAuto] = useState(false);
  const carousel = useRef<any>();
  const [_, space, Dwidth] = useDevideWidth(ops.itemSpace);

  const handlers = useSwipeable({
    onSwiped: ({ dir }) => handleSwipe(dir),
    onTouchStartOrOnMouseDown: () => onDrag(),
    trackMouse: true,
    trackTouch: true,
    preventScrollOnSwipe: true,
    onTouchEndOrOnMouseUp: () => handleEnd(),
  });

  const onRight = useCallback(() => {
    if (ops.position < slides.length - ops.itemsPerPage) {
      setOpts({ ...ops, position: ops.position + 1 });
    } else {
      setOpts({ ...ops, position: 0 });
    }
  }, [ops.position, auto, ops.dragging]);

  const onDrag = useCallback(() => {
    setOpts({ ...ops, dragging: true });
    setAuto(false);
  }, [ops.position, auto]);

  const handleSwipe = useCallback(
    (dir: string) => {
      console.log("swiped");
      if (dir === "Left") onRight();
      if (dir === "Right") onLeft();
    },
    [ops.position, auto, ops.dragging]
  );

  const handleEnd = () => {
    setAuto(true);
  };

  const startAuto = () => {
    slideInterval = setInterval(onRight, autoDuration);
  };

  const onLeft = () => {
    if (ops.position > 0) {
      setOpts({ ...ops, position: ops.position - 1 });
    }
  };

  useEffect(() => {
    setOpts({
      ...ops,
      width: carousel.current?.scrollWidth - carousel.current?.offsetWidth,
      itemHeight: ops.itemWidth / (16 / ops.itemSpace),
    });
    setAuto(true);
  }, []);

  useEffect(() => {
    setOpts({ ...ops, dragging: false });
  }, [ops.position]);

  useEffect(() => {
    if (auto) {
      startAuto();
    }

    return () => clearInterval(slideInterval);
  }, [auto, ops.position]);

  return (
    <div className="relative">
      <CarouselButton onClickE={onLeft} position="left">
        <FaChevronLeft />
      </CarouselButton>

      <CarouselButton onClickE={onRight} position="right">
        <FaChevronRight />
      </CarouselButton>

      <div className="overflow-hidden w-full mt-5" {...handlers}>
        <motion.div
          ref={carousel}
          className={`flex pb-3`}
          whileDrag={{
            cursor: "grab",
          }}
          animate={{
            x:
              space == 0
                ? ops.position * -carousel.current.offsetWidth
                : -(ops.position * (ops.itemWidth + ops.itemSpace)),
          }}
          dragConstraints={{
            right: 0,
            left: ops.width && -ops.width,
          }}
        >
          {slides.map((s, index) => (
            <CarouselItem
              key={index}
              src={s}
              dragging={ops.dragging}
              itemWidth={ops.itemWidth}
              itemHeight={ops.itemHeight}
            />
          ))}
        </motion.div>
      </div>
      <div className="flex justify-center mt-5 gap-3">
        {slides.map((_, index) => {
          if (index < slides.length - ops.itemsPerPage + 1) {
            return (
              <CarouselDot
                key={index}
                position={index}
                currentPosition={ops.position}
                onClickDot={(i) => setOpts({ ...ops, position: i })}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Carousel;
