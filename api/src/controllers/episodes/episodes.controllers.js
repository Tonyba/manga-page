import { Mangas } from "../../models/Manga/manga.model.js";
import { Episodes } from "../../models/episodes/episodes.model.js";
import { Images } from "../../models/images/images.model.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { deleteFolder } from "../../Helpers/Filter/deleteImages.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createEpisode = async (req, res) => {
  let { episode, mangaId, capNumber } = req.body;
  let imagesArr = req.files["images[]"];

  if (!Array.isArray(imagesArr)) imagesArr = [imagesArr];

  try {

    let exist = await Episodes.findOne({
      where: {
        capNumber
      }
    })

    if(exist) return res.status(400).json({ message: 'Ya existe un capitulo con ese numero'})

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

    const episodeDb = await Episodes.create({
      title: episode,
      capNumber,
      path: dir,
      mangaId,
    });

    await urls.forEach(async (url, i) => {
      const savedImage = await Images.create({
              name: images[i].name,  
              position: i,
              url: process.env.API_URL + url.replace('./src/public', ''),
              episodeId: episodeDb.id
        })
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
    const { mangaId, capNumber } = req.query;

    const manga = await Mangas.findOne({
      attributes: ["id", "title"],
      where: {
        id: mangaId,
      },
      include: [
        {
          model: Episodes,
          as: 'episodes'
        },
      ],
    });

    const Episode = await Episodes.findOne({
      where: {
        mangaId,
        capNumber
      },
      include: [
        {
          model: Images,
          as: 'image'
        }
      ]
    });

    res.status(200).json({
      images: Episode.image,
      manga,
    });
   
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error al obtener el episodio",
    });
  }
};

export const deleteEpisode = async (req, res) => {
  try {
    const { id } = req.params;

    if(!id) res.status(404).json({message: 'El id es requerido'});

    const episode = await Episodes.findOne({
      where: { id}
    });

    console.log(episode);

    if(episode) {
      await episode.destroy(); 
      deleteFolder(episode.path);
    } else {
      return res.status(404).json({message: 'El episodio no existe'})
    }

    res.status(200).json({message: 'Episodio Borrado con Exito'})

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al crear borrar el episodio",
    });
  }
}