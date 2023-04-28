import { Mangas } from "../../models/manga/manga.model.js";
import { Episodes } from "../../models/episodes/episodes.model.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createEpisode = async (req, res) => {
  let { episode, mangaId, capNumber } = req.body;
  const imagesArr = req.files["images[]"];

  try {
    let manga = await Mangas.findOne({
      where: {
        id: mangaId,
      },
    });

    let slug = episode
      .toLowerCase()
      .replace(/ /g, "_")
      .replace(/[^\w-]+/g, "");

    let dir = `${manga.path}/${slug}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const images = Object.values(imagesArr);
    const urls = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const path = `${dir}/${image.name}`;
      image.mv(path);
      urls.push(path);
    }

    const episodes = Episodes.create({
      title: episode,
      capNumber,
      path: dir,
      mangaId,
    });
    res.status(200).json("Capitulo creado con exito");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error al crear el episodio",
    });
  }
};

export const getImages = async (req, res) => {
  try {
    const { title, episode } = req.query;

    let pathTitle = title
      .toLowerCase()
      .replace(/ /g, "_")
      .replace(/\-/g, "_")
      .replace(/[^\w-]+/g, "");

    let pathEpisode = episode
      .toLowerCase()
      .replace(/ /g, "_")
      .replace(/\-/g, "_")
      .replace(/[^\w-]+/g, "");

    const directoryPath = `./src/public/episodes/${pathTitle}/${pathEpisode}`;

    fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      let imagesPath = [];
      files.forEach(function (file) {
        imagesPath.push(
          `http://localhost:3000/episodes/${pathTitle}/${pathEpisode}/${file}`
        );
      });
      res.status(200).json(imagesPath);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error al crear el episodio",
    });
  }
};
