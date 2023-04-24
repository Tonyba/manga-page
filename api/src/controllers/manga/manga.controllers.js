import { Mangas } from "../../models/manga/manga.model.js";
import fs from "fs";
import { Episodes } from "../../models/episodes/episodes.model.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createManga = async (req, res) => {
  const { title, description, type, genres, demography } = req.body;
  const { image, banner } = req.files;
  try {
    let path = __dirname + "/../../public/mangas/" + image?.name;
    image?.mv(path, function (err, data) {
      if (err) throw err;
      console.log(data);
    });
    path = __dirname + "/../../public/mangas/" + banner?.name;
    banner?.mv(path, function (err, data) {
      if (err) throw err;
      console.log(data);
    });
    let url = "http://localhost:3000/mangas/";

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
      image: `${url}${image?.name}`,
      banner: `${url}${banner?.name}`,
      genres: genres.split(" "),
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
    const mangas = await Mangas.findAll();
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

    const manga = await Mangas.findOne({
      where: {
        id: id,
      },
      include: Episodes,
    });

    if (!manga)
      res.status(500).json({
        message: "Nose encontro ningun manga por el id: " + id,
      });

    const numEpisodes = parseInt(manga.Episodes.length);

    res.status(200).json({ manga, numEpisodes });
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener la informacion del manga",
    });
  }
};
