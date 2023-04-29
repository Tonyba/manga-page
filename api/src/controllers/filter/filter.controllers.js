import { Mangas } from "../../models/Manga/manga.model.js";
import { Op } from "sequelize";
import { filterAndPaginateContent } from "../../Helpers/Filter/filterPaginate.js";
// ! Finalizada
export const filtersGeneral = async (req, res) => {
  try {
    let queries = req.query;
    let type = "Manga";

    /**
     * genres
     * limit  page
     * type
     * demography
     * status
     *
     */

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
      searchQuery.type = queries.type;
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

    return res.status(200).json({ count, result });
  } catch (err) {
    res.status(500).json({
      message: "Nose pudo filtrar el contenido",
    });
  }
};

export const filterTitle = async (req, res) => {
  const { title } = req.query;
  const manga = await Mangas.findAll({
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
  const manga = await Mangas.findAll({
    offset: (page - 1) * limit,
    limit: limit,
  });

  res.json(manga);
};
