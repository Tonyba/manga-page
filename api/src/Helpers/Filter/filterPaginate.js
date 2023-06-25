import { Mangas } from "../../models/Manga/manga.model.js";
import { Episodes } from "../../models/episodes/episodes.model.js";
import sequelize from "../../database/database.js";

export const filterAndPaginateContent = async (_, filters, page, limit) => {
  
  try {
    let searchFilters = {
      where: filters,
      group: [sequelize.col("Mangas.id")],
      order: [["id", "DESC"]],
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "type",
        'status',
        "demography",
        [
          sequelize.fn("max", sequelize.col("episodes.capNumber")),
          "lastChapter",
        ],
        [sequelize.fn('COUNT', sequelize.col('episodes.id')), 'numEpisodes']
      ],
      include: [
        {
          duplicating: false,
          model: Episodes,
          attributes: [],
          as: 'episodes'
        },
      ],
      offset: page * limit,
      limit,
    };

    let result = [];
    let count = 0;

    
    const mangasCount = await Mangas.count({
        ...searchFilters,
        include: undefined,
        attributes: [],
        group: undefined,
      });
      const mangas = await Mangas.findAll(searchFilters);


      result = mangas;
      count = mangasCount;
      return { result, count };
 
  } catch (err) {
    console.log(`Se Presento un problema al intentar filtrar: ${err}`);
  }
};
