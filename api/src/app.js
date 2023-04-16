import express from "express";
import morgan from "morgan";
// ----------------------------------------------------------------
import mangas from "./routes/manga/manga.routes.js";
import episodes from "./routes/episodes/episodes.routes.js";
import users from "./routes/user/user.routes.js";
// ----------------------------------------------------------------
import { Mangas } from "./models/manga/manga.model.js";
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
dotenv.config();
const app = express();

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
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  // Se agrega el x-auth-token para que se pueda enviar el token en el header
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
Episodes.belongsTo(Mangas, { foreignKey: "mangaId" });
Mangas.hasMany(Episodes, { foreignKey: "mangaId" });

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

export default app;