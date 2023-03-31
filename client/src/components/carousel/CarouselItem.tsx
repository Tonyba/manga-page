import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const CarouselItem = () => {
  return (
    <motion.div
      className="min-h-cardCarousel min-w-max cursor-pointer"
      onClick={() => console.log("hola")}
    >
      <Image
        alt="whatever"
        src={"https://picsum.photos/300/400"}
        width={300}
        className="relative max-h-80 rounded-lg w-full h-full pointer-events-none"
        height={400}
      />
    </motion.div>
  );
};

export default CarouselItem;
