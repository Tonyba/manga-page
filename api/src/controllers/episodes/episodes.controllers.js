import { Mangas } from "../../models/Manga/manga.model.js";
import { Episodes } from "../../models/episodes/episodes.model.js";
import { Images } from "../../models/images/images.model.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { deleteFolder, deleteImage, renameImages } from "../../Helpers/deleteImages.js";
import {resolve} from "path";
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

function getFilename(fullPath) {
  return fullPath.replace(/^.*[\\\/]/, '');
}

export const updateEpisode = async (req ,res) => {
  const { id } = req.params;
  try {

    const episode = await Episodes.findByPk(id);

    if(!episode) return res.status(404).json({ message: 'El Capitulo no Existe' });

    const manga = await Mangas.findByPk(episode.mangaId);

    req.body.images = JSON.parse(req.body.images);
    let imagesArr = req.files ? req.files['imagesFiles[]'] : [];

    if (!Array.isArray(imagesArr)) imagesArr = [imagesArr];

    const imagesFromEpisode = await Images.findAll({
      where: {
        episodeId: episode.id 
      },
      order: [['position', 'asc']],
      raw: true
    })



    const changedPositionImgs = imagesFromEpisode.flatMap(img => {
      const changed = req.body.images.find(bodyImg => bodyImg.id == img.id && bodyImg.position != img.position);
      if(changed) return changed;
      return [];
    });

    const deletedImgs = imagesFromEpisode.filter(x => !req.body.images.some(y => x.id == y.id && !y.file));

    let newImages = req.body.images.filter(img => img.file);

    

    newImages = newImages.map(img =>  (
      {...img, 
        file: imagesArr.find(f => f.name.split('.')[0] == img.position + 1)
      }))


    const changedImgs = changedPositionImgs.concat(newImages);

    console.log('==================');

    const folderEpisode = changedPositionImgs[0]?.url?.split('/')[5] || deletedImgs[0]?.url?.split('/')[5];
    const folderManga =  changedPositionImgs[0]?.url?.split('/')[4] || deletedImgs[0]?.url?.split('/')[4];

  //  await deletedImgs.forEach(async (img, i) => {

  //     deleteImage(img.url, `episodes/${folderManga}/${folderEpisode}`);

  //     await Images.destroy({
  //       where: {
  //         id: img.id,
  //         position: img.position
  //       }
  //     })

  //     if(i === deletedImgs.length - 1) console.log('termina borrado');

  //   })

  //console.log(imagesArr)

      renameImages(changedPositionImgs);

      await changedImgs.forEach(async (img, i) => {
        if(i === 0) console.log('empieza actualizar')
        const fileExt = img.file ? img.file.name.split('.').pop() : img.url.split('.').pop();
        const imgName = `${(img.position + 1) + '.' + fileExt}`;
        const path = process.env.API_URL + `${manga.path.replace('./src/public', '')}/capitulo_${episode.capNumber}/${imgName}`;

        if(img.file) {
         const publicPath = resolve(manga.path + `/capitulo_${episode.capNumber}/${imgName}`);
         img.file.mv(publicPath);
          console.log(path, 'file')
        } else {
          console.log(path, 'change po')
        }
        
        const savedImage = await Images.upsert(
         {
          position: img.position,
          name: `${parseInt(img.position) + 1}.${fileExt}`,
          url: path,
          episodeId: id
         },
         {
          where: {
            id: img.id,
            position: img.position
          }
         }
        )
      })
  

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