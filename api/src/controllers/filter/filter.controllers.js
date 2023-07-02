import { Mangas } from "../../models/Manga/manga.model.js";
import { Op } from "sequelize";
import { filterAndPaginateContent } from "../../Helpers/Filter/filterPaginate.js";
import sequelize from "../../database/database.js";
import { Episodes } from "../../models/episodes/episodes.model.js";

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
      limit = parseInt(queries.limit);
    }

    if (queries.page) {
      page = parseInt(queries.page);
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
  const manga = await Mangas.findAndCountAll({
    group: ["Mangas.id"],
    attributes: [
      "id",
      "title",
      "description",
      "image",
      "type",
      "demography",
      [sequelize.fn("max", sequelize.col("episodes.capNumber")), "lastChapter"],
    ],
    where: {
      title: {
        [Op.iLike]: `%${title}%`,
      },
    },
    include: [
      {
        duplicating: false,
        model: Episodes,
        attributes: [],
        as: 'episodes'
      },
    ],
  });

  const result = manga.rows;
  const count = manga.count;

  res.json({ result, count });
};

export const pagination = async (req, res) => {
  const { page, limit } = req.query;
  const manga = await Mangas.findAll({
    offset: (page - 1) * limit,
    limit: limit,
  });

  res.json(manga);
};
