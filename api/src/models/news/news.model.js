import sequelize from "../../database/database.js";
import { DataTypes } from "sequelize";

export const News = sequelize.define(
  "News",
  {
    id: {
      type: DataTypes.INTEGER,
      autoincrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    front_page: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);
