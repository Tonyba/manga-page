import { Mangas } from "../../models/Manga/manga.model.js";
import fs from "fs";
import { Episodes } from "../../models/episodes/episodes.model.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import sequelize from "../../database/database.js";
import { deleteFolderAndImageFromManga, deleteImage } from "../../Helpers/Filter/deleteImages.js";

import { v4 as uuidv4 } from 'uuid';
import { QueryTypes } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getDashboardData = async (req, res) => {
  try {
    const mangasCount = await countMangaType("Manga");
    const manhuasCount = await countMangaType("Manhua");
    const manhwasCount = await countMangaType("Manhwa");

    const lastAddedChapters = await Episodes.findAll({
      limit: 10,
      order: [["id", "DESC"]],
      include: [
        {
          model: Mangas,
          attributes: {
            exclude: [
              "genres",
              "banner",
              "demography",
              "description",
              "status",
              "path",
            ],
          },
        },
      ],
      attributes: { exclude: ["mangaId"] },
    });

    const lastAddedMangas = await Mangas.findAll({
      limit: 10,
      order: [["id", "DESC"]],
      attributes: {
        exclude: [
          "banner",
          "genres",
          "demography",
          "description",
          "status",
          "path",
        ],
      },
    });

    res.json({
      mangasCount,
      manhuasCount,
      manhwasCount,
      lastAddedChapters,
      lastAddedMangas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener los datos",
    });
  }
};

const countMangaType = async (type) => {
  const count = await Mangas.count({
    where: {
      type,
    },
  });

  return count;
};

export const createManga = async (req, res) => {
  const { title, description, type, demography } = req.body;
  let genres = req.body["genres[]"];
  const { image, banner } = req.files;

  if (!Array.isArray(genres)) genres = [genres];

  try {

    const exist = await Mangas.findOne({
      where: {
        title
      }
    })

    console.log(exist)

    if(exist) return res.status(400).json({ message: `Ya hay un ${type} con el mismo titulo` });

    let imageHash = uuidv4() + '_image_';
    let bannerHash = uuidv4() + '_banner_';

    let path = __dirname + "/../../public/mangas/" + imageHash + image?.name;
    image?.mv(path, function (err, data) {
      if (err) throw err;
      console.log(data);
    });
    path = __dirname + "/../../public/mangas/" + bannerHash + banner?.name;
    banner?.mv(path, function (err, data) {
      if (err) throw err;
      console.log(data);
    });
    let url = `${process.env.API_URL}/mangas/`;

    // --------------------------------------------

    const slug = title
      .toLowerCase()
      .replace(/ /g, "_") 
      .replace(/[^\w-]+/g, "");

    const dir = `./src/public/episodes/${slug}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const manga = await Mangas.create({
      title,
      description,
      image: `${url}${imageHash}${image?.name}`,
      banner: `${url}${bannerHash}${banner?.name}`,
      genres,
      type,
      demography,
      path: dir,
    });
    res.status(200).json(manga);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error al crear el manga",
    });
  }
};

export const getMangas = async (req, res) => {
  try {
    const mangas = await Mangas.findAll({
      group: [sequelize.col("Mangas.id")],
      order: [["id", "DESC"]],
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "type",
        "demography",
        [
          sequelize.fn("max", sequelize.col("episodes.capNumber")),
          "lastChapter",
        ],
      ],
      include: [
        {
          duplicating: false,
          model: Episodes,
          attributes: [],
          as: 'episodes'
        },
      ],
    });
    res.status(200).json(mangas);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error al obtener los mangas",
    });
  }
};

export const getMangaById = async (req, res) => {
  try {
    const { id } = req.params;

    const manga = await sequelize.query(`
    SELECT 
    Ma."id" AS id,
    Ma."title" AS title,
    Ma."demography" AS demography,
    Ma."description" AS description,
    Ma."image" AS image,
    Ma."banner" AS banner,
    Ma."type" AS type,
    Ma."genres" AS genres,
    Ma."status" AS status,
    COUNT(Episodes_join.id)::int AS "numEpisodes",
    COALESCE(
      json_agg(
        json_build_object(
        'id', Episodes_join."id",
        'title', Episodes_join."title",
        'capNumber', Episodes_join."capNumber",
        'mangaId', Episodes_join."mangaId",
        'image', (
          SELECT Img."url" FROM "Images" AS Img 
          WHERE Img."episodeId" = Episodes_join."id" 
          LIMIT 1
        )
        )
      ) 
      FILTER (WHERE Episodes_join."id" is not null),
      '[]'
    ) AS episodes
    FROM "Mangas" Ma
    LEFT JOIN (
    SELECT id, Ep."mangaId", Ep."title", Ep."capNumber" 
      FROM "Episodes" AS Ep 
      ORDER BY Ep."capNumber" ASC
    ) AS Episodes_join ON Episodes_join."mangaId" = Ma."id"
    WHERE Ma."id" = :id
    GROUP BY Ma."id"
    `, { 
      type: QueryTypes.SELECT,
      model: Mangas,
      mapToModel: true,
      plain: true,
      replacements: {
        id
      }
     });

    if (!manga)
      return res.status(500).json({
        message: "No se encontro ningun manga por el id: " + id,
      });


    res.status(200).json({ manga });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error al obtener la informacion del manga",
    });
  }
};

export const deleteManga = async (req, res) => {
  try {
    const { id } = req.params;

    if(!id) res.status(404).json({message: 'El id es requerido'});

    const manga = await Mangas.findOne({
      where: { id}
    });

    if(manga) {
      await manga.destroy();
      deleteFolderAndImageFromManga(manga.path, [manga.image, manga.banner])
    } else {
      return res.status(404).json({message: 'El manga no existe'})
    }

    res.status(200).json({message: 'Manga Borrado con Exito'})

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al crear borrar el manga",
    });
  }
}

export const bulkDeleteManga = async (req, res) => {
  try {
    let { mangas } = req.body;
    const found = [];
    const notFound = [];

    if (!Array.isArray(mangas)) mangas = [mangas];

    const existed =  mangas.map(async (id) => {
      const manga = await Mangas.findByPk(id);

      if(manga) {
        deleteFolderAndImageFromManga(manga.path, [manga.image, manga.banner]);
        found.push(id)
      } else {
        notFound.push(id)
      }

      return manga;
            
    });   

    const promises = await Promise.all(existed);

    await Mangas.destroy({where: { id: found }})

    res.status(200).json({
      message: 'Mangas Borrados con Exito',
      notDeletedMsg: `${notFound.length ? `Los siguientes mangas con los ids ${ notFound.reduce((prev, current) => prev + ', ' + current , '') } no fueron borrados porque probablemente no existen o surgio un error`  : 'Todos fueron borrados'}`
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al borrar manga",
    });
  }
}

export  const updateManga = async (req, res) => {
  try {
    
    const { id } = req.params;
    let genres = req.body["genres[]"];
    let files = {};
    let url = `${process.env.API_URL}/mangas/`;

    if(req.files) {
      const { image, banner } = req.files;
      files = {image, banner};
    }


 

    if(!id) return res.status(404).json({message: 'El id es requerido'});

    if (!Array.isArray(genres)) genres = [genres];

    const manga = await Mangas.findOne({
      where: { id}
    });
    
    

    if(manga) {

      if(files.image) {
        const imageHash = uuidv4() + '_image_';
        deleteImage(manga.image);
        const path = __dirname + "/../../public/mangas/" + imageHash + files.image?.name;
        files.image?.mv(path, function (err, data) {
          if (err) throw err;
          console.log(data);
        });
        req.body.image = `${url}${imageHash}${files.image?.name}`;
      }
  
      if(files.banner) {
        const bannerHash = uuidv4() + '_banner_';
        deleteImage(manga.banner);
        const path = __dirname + "/../../public/mangas/" + bannerHash + files.banner?.name;
        files.banner?.mv(path, function (err, data) {
          if (err) throw err;
          console.log(data);
        });
        req.body.banner = `${url}${bannerHash}${files.banner?.name}`;
      }
      
      await manga.update({...req.body, genres});
    } else {
     return res.status(404).json({message: 'El manga no existe'});
    }
    
    res.status(200).json({message: 'Manga fue Actualizado con Exito'});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al crear actualizar el manga",
    });
  }
}