import fs from "fs";

const getImageFromEpisode = (title, episode) => {
    console.log(title, episode)
    let image = '';
    let pathTitle = title
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/\-/g, "_")
    .replace(/[^\w-]+/g, "");
   
    const directoryPath = `./src/public/episodes/${pathTitle}/capitulo-${episode}`;
    const basePath = `http://localhost:3000/episodes/${pathTitle}/capitulo-${episode}`;

    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
          return console.log("Unable to scan directory: " + err);
        }
        
        
        if(files.length === 0) return null;

        if(files.length === 1) image = `${basePath}/${files[0]}`;

        if(files.length > 1) images = `${basePath}/${files[Math.ceil(files.length / 2)]}`

        return image;
  
       
      });

}

export default getImageFromEpisode;