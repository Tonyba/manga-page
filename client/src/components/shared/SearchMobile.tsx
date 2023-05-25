import React, { FC, useState } from "react";
import Popup from "./Popup";
import SlideContainer from "./SlideContainer";
import Input from "../forms/Input";
import SearchBox from "./SearchBox";
import { ChapterItemType, ContentType } from "@/utils/types";

type Props = {
  open: boolean;
  type: "mangas" | "chapters";
  handleOpen: () => void;
  search: string;
  setSearch: (val: string) => void;
  data: ContentType[] | ChapterItemType[];
  isLoading?: boolean;
};

const SearchMobile: FC<Props> = ({
  type,
  open,
  handleOpen,
  search,
  setSearch,
  data,
  isLoading,
}) => {
  return type === "mangas" ? (
    <Popup
      isOpen={open}
      onModalClose={handleOpen}
      className="bg-primary-dark-opacity justify-center items-start"
    >
      <SlideContainer
        className="relative bg-primary-dark w-full p-5"
        direction="up"
      >
        <span className="uppercase font-semibold mb-2 block">
          Buscar series
        </span>
        <Input
          value={search}
          type="search"
          placeholder="Busca un Manga..."
          onChange={(val) => setSearch(val)}
        />
        <div className="max-w-full">
          {search && (
            <SearchBox data={data} type={type} isLoading={isLoading} />
          )}
        </div>
      </SlideContainer>
    </Popup>
  ) : (
    <Popup
      isOpen={open}
      onModalClose={handleOpen}
      className="bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center"
    >
      <div className="bg-primary-dark p-5 rounded-lg">
        <span className="uppercase font-semibold mb-2 block">
          Buscar Capitulo
        </span>
        <Input
          value={search}
          type="number"
          placeholder="Busca un Capitulo..."
          onChange={(val) => setSearch(val)}
        />
        <SearchBox data={data} type={type} />
      </div>
    </Popup>
  );
};

export default SearchMobile;
