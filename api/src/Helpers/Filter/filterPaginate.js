import { Mangas } from "../../models/Manga/manga.model.js";

export const filterAndPaginateContent = async (
  type = "Manga",
  filters,
  page,
  limit
) => {
  try {
    let searchFilters = {
      where: filters,
      offset: (page - 1) * limit, // 6
      limit, // 4
    };

    let result = [];
    let count = 0;

    if (type) {
      const mangas = await Mangas.findAndCountAll(searchFilters);
      result = mangas.rows;
      count = mangas.count;
      return { result, count };
    } else {
      searchFilters.limit /= 4;
      const AllMangas = await Mangas.findAndCountAll(searchFilters);
      result = AllMangas.rows;
      count += AllMangas.count;
      return { result, count };
    }
  } catch (err) {
    console.log(`Se Presento un problema al intentar filtrar: ${err}`);
  }
};
