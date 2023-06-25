import { ContentType, OptionType } from "./types";

export const RemoveLastDirectoryPartOf = (the_url: string) => {
  var the_arr = the_url.split("/");
  the_arr.pop();
  return the_arr.join("/");
};

export const handlePush = (elems: OptionType[]): string[] => {
  const values: string[] = [];
  elems.forEach((elem) => {
    values.push(elem.label);
  });

  return values;
};

export const findFavorite = (id: number, favorites: ContentType[]) => {
  const favorite = favorites.find((favorite) => favorite.id === id);

  if (favorite) return true;

  return false;
};

export const isType = <Type>(thing: unknown): thing is Type => true;

export const toSlug = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\W_]+/g, "-")
    .toLowerCase()
    .replace(/^-+|-+$/g, "");
};

export const getChapterNumber = (txt: string) => {
  const newTxt = txt.split("-")[1];
  return parseInt(newTxt);
};
