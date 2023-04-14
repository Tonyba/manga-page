import sequelize from "../../database/database.js";
import { DataTypes, STRING } from "sequelize";

export const Mangas = sequelize.define(
  "Mangas",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.TEXT,
    },
    demography: {
      type: DataTypes.STRING,
    },
    banner: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Emision",
    },
    genres: {
      type: DataTypes.ARRAY(STRING),
    },
    type: {
      type: DataTypes.TEXT,
      defaultValue: "Manga",
    },
    // referencia a las carpetas de los episodios
    path: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);
