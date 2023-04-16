import { Manga } from "../../models/Manga/manga.model.js";
import { Op } from "sequelize";

export const filtersGeneral = async (req, res) => {
  let queries = req.query;
  let type = "Manga";

  let page = 1;
  let limit = 24;

  let searchQuery = {};

  if (queries.genres) {
    searchQuery.genres = {
      [Op.contains]: [queries.genres.split(",")],
    };
  }

  if (queries.limit) {
    limit = queries.limit;
  }

  if (queries.page) {
    page = queries.page;
  }

  if (queries.type) {
    type = queries.type;
  }

  if (queries.demography) {
    searchQuery.demography = queries.demography;
  }

  if (queries.status) {
    searchQuery.status = queries.status;
  }

  const { result, count } = await filterAndPaginateContent(
    type,
    searchQuery,
    page,
    limit
  );

  return res.json({ count, result });
};

export const filterTitle = async (req, res) => {
  const { title } = req.query;
  const manga = await Manga.findAll({
    where: {
      title: {
        [Op.iLike]: `%${title}%`,
      },
    },
  });

  res.json(manga);
};

export const pagination = async (req, res) => {
  const { page, limit } = req.query;
  const manga = await Manga.findAll({
    offset: (page - 1) * limit,
    limit: limit,
  });

  res.json(manga);
};

const filterAndPaginateContent = async (
  type = "Manga",
  filters,
  page,
  limit
) => {
  let searchFilters = {
    where: filters,
    offset: (page - 1) * limit,
    limit,
  };

  let result = [];
  let count = 0;

  switch (type) {
    case "Manga":
      const mangas = await Manga.findAndCountAll(searchFilters);
      result = mangas.rows;
      count = mangas.count;
      break;

    case "Manhua":
      const manhuas = await Manhua.findAndCountAll(searchFilters);
      result = manhuas.rows;
      count = manhuas.count;
      break;
    case "Manhwa":
      const manhwas = await Manhwa.findAndCountAll(searchFilters);
      result = manhwas.rows;
      count = manhwas.count;
      break;

    default:
      searchFilters.limit /= 4;

      const AllAnimes = await Anime.findAndCountAll(searchFilters);
      const AllMangas = await Manga.findAndCountAll(searchFilters);
      const AllManhwas = await Manhwa.findAndCountAll(searchFilters);
      const AllManhuas = await Manhua.findAndCountAll(searchFilters);

      result = AllAnimes.rows.concat(
        AllMangas.rows,
        AllManhwas.rows,
        AllManhuas.rows
      );

      console.log("final total", result.length);

      count +=
        AllAnimes.count + AllMangas.count + AllManhuas.count + AllManhwas.count;

      break;
  }

  return { result, count };
};
