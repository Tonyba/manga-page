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
        capNumber,
        mangaId
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

    res.status(200).json({message: "Capitulo creado con exito"});
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

    const Episode = await Episodes.findOne({
      where: {
        mangaId,
        capNumber
      },
      include: [
        {
          model: Images,
          as: 'images'
        }
      ],
      order: [
        [{model: Images, as: 'images'}, 'position', 'asc']
      ]
    });

    if(!Episode) return res.status(404).json({message: 'El episodio no existe'});

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

    res.status(200).json({
        images: Episode.images,
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

export const updateEpisode = async (req ,res) => {
  const { id } = req.params;
  try {

    const episode = await Episodes.findByPk(id);

    if(!episode) return res.status(404).json({ message: 'El Capitulo no Existe' });

    console.log(req.body);

    // await episode.update({...req.body});

    res.status(202).json({
      message: 'Capitulo Actualizado'
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Ocurrio un problema al actualizar el capitulo'
    })
  }





}

export const getEpisode = async(req, res) => {

  try {
    const { id } = req.params;

    const episode = await Episodes.findOne({
      where: {
        id
      },
      include: [
        {
          model: Images,
          as: 'images',
        }
      ],
      order: [
        [{model: Images, as: 'images'}, 'position', 'asc']
      ]
    });

    if(!episode) return res.status(404).json({message: 'El episodio no se encontro'});

    res.json(episode);
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Ocurrio un problema al obtener el capitulo'
    })
  }

}