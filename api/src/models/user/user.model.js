import sequelize from "../../database/database.js";
import { DataTypes } from "sequelize";

export const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.STRING,
  },
  paypal: {
    type: DataTypes.STRING,
  },
});
