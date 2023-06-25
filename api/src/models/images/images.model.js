import sequelize from "../../database/database.js";
import { DataTypes } from "sequelize";

export const Images = sequelize.define(
    'Images',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
      timestamps: false,
    }
)