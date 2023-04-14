import sequelize from "../../database/database.js";
import { DataTypes } from "sequelize";
import { Mangas } from "../manga/manga.model.js";
import { Users } from "../User/user.model.js";

export const MangaFav = sequelize.define("manga_fav", {
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: "id",
    },
  },
  MangaId: {
    type: DataTypes.INTEGER,
    references: {
      model: Mangas,
      key: "id",
    },
  },
});
