
import express from "express";
import morgan from "morgan";
// ----------------------------------------------------------------
import mangas from "./routes/manga/manga.routes.js";
import episodes from "./routes/episodes/episodes.routes.js";
import users from "./routes/user/user.routes.js";
import filters from "./routes/filter/filter.routes.js";
// ----------------------------------------------------------------
import { Mangas } from "./models/Manga/manga.model.js";
import { Episodes } from "./models/episodes/episodes.model.js";
import { Users } from "./models/User/user.model.js";
import { MangaFav } from "./models/manga_fav/manga_fav.js";
// ----------------------------------------------------------------
import dotenv from "dotenv";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from "path";
import { Images } from "./models/images/images.model.js";
dotenv.config();
const app = express();

global.__basedir = __dirname; 

// middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "x-auth-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  next();
});
 
// Relacionamientos 
/* 
  ! Relacionamiento Manga y Episodes
*/
Episodes.belongsTo(Mangas, { foreignKey: "mangaId"});
Mangas.hasMany(Episodes, { foreignKey: "mangaId",  onDelete: 'CASCADE', hooks: true,  as: 'episodes' });

/*  
  ! Relacionamiento Images y Episodes
*/
Episodes.hasMany(Images, { foreignKey: "episodeId", as: 'images', onDelete: 'CASCADE', onUpdate: 'CASCADE',  hooks: true})
Images.belongsTo(Episodes, { foreignKey: "episodeId"});
 
 
/* 
 ! Relacionamiento Favoritos de usuarios
*/

Mangas.belongsToMany(Users, { through: MangaFav });
Users.belongsToMany(Mangas, { through: MangaFav });

// ----------------------------------------------------------------
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use(mangas); 
app.use(episodes); 
app.use(users);
app.use(filters); 

export default app;
