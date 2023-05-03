import sequelize from "../../database/database.js";

import { DataTypes } from "sequelize";

export const Episodes = sequelize.define(
  "Episodes",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    capNumber: {
      type: DataTypes.INTEGER,
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
