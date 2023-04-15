import React, { FC } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { ContentType } from "@/utils/types";
import CardItem from "../cardItem/CardItem";
import { FaChevronRight } from "react-icons/fa";

type Props = {
  content: ContentType[];
};

const CarouselSwiper: FC<Props> = ({ content }) => {
  return (
    <Splide
      options={{
        type: "loop",
        perPage: 5,
        perMove: 1,
        autoplay: true,
        gap: "1rem",
        interval: 3000,
        pauseOnHover: true,
        breakpoints: {
          1024: {
            perPage: 4,
          },
          768: {
            perPage: 3,
          },
          500: {
            perPage: 1,
          },
        },
      }}
      tag="section"
      aria-label="Home Carousel"
      hasTrack={false}
    >
      <SplideTrack>
        {content.map((c, index) => (
          <SplideSlide>
            <CardItem content={c} index={index} showHover={false} />
          </SplideSlide>
        ))}
      </SplideTrack>
      <div className="splide__arrows">
        <button
          className=" splide__arrow--prev bg-primary bg-hover  
        absolute top-1/2 -translate-y-1/2 rounded-full p-2  text-center flex justify-center items-center !-left-4"
        >
          <FaChevronRight />
        </button>
        <button className="bg-primary bg-hover  absolute top-1/2 -translate-y-1/2 rounded-full p-2 !-right-4  text-center flex justify-center items-center splide__arrow--next">
          <FaChevronRight />
        </button>
      </div>
    </Splide>
  );
};

export default CarouselSwiper;
