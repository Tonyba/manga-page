import fs from "fs";
import path from "path";


const deleteFolderAndImageFromManga = async (folder, images) => {

    await deleteFolder(folder);

    images.forEach((image) => {
        deleteImage(image);
    });
}

const deleteImage = (image, folder) => {
    const mangaImagesPath = path.resolve( __basedir + `/public/${folder}`);
    const filename = image.substring(image.lastIndexOf('/')+1);
    const imagePath = path.resolve(mangaImagesPath + '/' + filename);
    const imageExist = fs.existsSync(imagePath);

    if(imageExist) fs.unlinkSync(imagePath);
}

const deleteFolder = async (folder) => {

    await fs.readdir(folder, function (err, files) {
        if (err) {
            return console.log("Unable to scan directory: " + err);
        }

        fs.rmSync(folder, {recursive: true, force: true});
    });

   
}

const renameImages = async (images) => {
     const tempPaths = images.map((img) => {
        const filename = img.url.substring(img.url.lastIndexOf('/')+1);
        const folderManga =  img.url.split('/')[4];
        const folderEpisode = img.url.split('/')[5];
        const fileExt = filename.split('.').pop();

        const oldPath = path.resolve( __basedir + `/public/episodes/${folderManga}/${folderEpisode}/${filename}`);
        const newPathTemp = path.resolve(__basedir + `/public/episodes/${folderManga}/${folderEpisode}/${parseInt(img.position) + 1}-temp.${fileExt}`);
        const newPath = path.resolve(__basedir + `/public/episodes/${folderManga}/${folderEpisode}/${parseInt(img.position) + 1}.${fileExt}`);

        
        fs.renameSync(oldPath, newPathTemp); // renombra todas las imagenes con posicion cambiada con temp al final primero
        return {oldPath: newPathTemp, newPath};
    });

    tempPaths.forEach(({oldPath, newPath}) => {
        fs.renameSync(oldPath, newPath); // renombra las imagenes con la posicion cambiada con el path nuevo a lo ultimo
    });
}

export {
    deleteFolderAndImageFromManga,
    deleteFolder,
    deleteImage,
    renameImages
};