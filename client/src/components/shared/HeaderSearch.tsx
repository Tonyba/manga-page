import React, { useState } from "react";
import UseAnimations from "react-useanimations";
import second from "react-useanimations/lib/searchToX";

const HeaderSearch = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div
      className={`relative h-12 
      overflow-hidden
      transition-[width]
      cursor-pointer 
      bg-slate-800 rounded-full hover:bg-slate-700 ${open ? "w-80" : "w-12"} `}
    >
      <button
        onClick={() => setOpen(!open)}
        className="
        left-6
        z-10
        absolute 
        left-30 top-1/2 -translate-x-2/4 
        -translate-y-2/4"
      >
        <UseAnimations
          autoplay={true}
          loop={true}
          size={21}
          animation={second}
          strokeColor={"#fff"}
        />
      </button>
      <div
        className="relative  w-64
          h-12
          flex
          align-middle
          justify-center"
      >
        <input
          type="text"
          className="
          absolute
          w-full
          h-full
          left-12
          border-none
          outline-none
          bg-transparent
        "
          placeholder="Busca un manga..."
        />
      </div>
    </div>
  );
};

export default HeaderSearch;
