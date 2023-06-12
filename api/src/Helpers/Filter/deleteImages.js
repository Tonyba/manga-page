import fs from "fs";
import path from "path";


const deleteFolderAndImageFromManga = async (folder, images) => {

    await deleteFolder(folder);

    images.forEach((image) => {
        deleteImage(image);
    });
}

const deleteImage = (image) => {
    const mangaImagesPath = path.resolve( __basedir + '/public/mangas');
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

export {
    deleteFolderAndImageFromManga,
    deleteFolder,
    deleteImage
};