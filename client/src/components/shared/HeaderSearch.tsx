import React, { FC, useState } from "react";
import UseAnimations from "react-useanimations";
import second from "react-useanimations/lib/searchToX";

type Props = {
  placeholder?: string;
};

const HeaderSearch: FC<Props> = ({ placeholder = "Busca un manga..." }) => {
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
          reverse={open}
          size={22}
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
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default HeaderSearch;
