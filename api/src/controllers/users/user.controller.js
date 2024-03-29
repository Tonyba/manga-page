import { Users } from "../../models/User/user.model.js";
import { Mangas } from "../../models/Manga/manga.model.js";
import { MangaFav } from "../../models/manga_fav/manga_fav.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { deleteImage } from "../../Helpers/deleteImages.js";
import { v4 as uuidv4 } from "uuid";
import { Episodes } from "../../models/episodes/episodes.model.js";
import sequelize from "../../database/database.js";

dotenv.config();

export const createUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const verfiEmail = await Users.findOne({ where: { email } });
    console.log(userName, email, password);

    if (verfiEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Users.create({
      userName,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exists
    const veryEmail = await Users.findOne({ where: { email } });

    if (!veryEmail)
      return res.status(400).json({ error: "Invalid credentials" });

    // check if password is correct
    const isMatch = await bcrypt.compare(password, veryEmail.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // create token
    const payload = {
      id: veryEmail.id,
      role: veryEmail.role,
    };
    jwt.sign(
      payload,
      process.env.PRIVATE_KEY,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Revisa los datos de acceso se presentaron problemas" });
  }
};

export const addFavorite = async (req, res) => {
  console.log(req.body);
  try {
    const { idContent, idUser } = req.body;

    const userFound = await Users.findByPk(idUser);

    if (!userFound) {
      return res.status(400).json({ error: "User not found" });
    }

    let content;
    content = await Mangas.findByPk(idContent);

    const manga = await MangaFav.create({ UserId: idUser, MangaId: idContent });

    res.status(200).json(content);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const { id } = req.params;

    const userFound = await Users.findOne({
      attributes: ["id", "email", "role", "avatar", "userName"],
      order: [["id", "DESC"]],
      group: [
        sequelize.col("favorites.id"),
        sequelize.col("Users.id"),
        sequelize.col("favorites->manga_fav.UserId"),
        sequelize.col("favorites->manga_fav.MangaId"),
      ],
      include: [
        {
          duplicating: false,
          model: Mangas,
          as: "favorites",
          group: [sequelize.col("Mangas.id")],
          attributes: [
            "id",
            "title",
            "description",
            "image",
            "type",
            "demography",
            [
              sequelize.fn(
                "max",
                sequelize.col("favorites->episodes.capNumber")
              ),
              "lastChapter",
            ],
          ],
          include: [
            {
              duplicating: false,
              required: true,
              model: Episodes,
              attributes: [],
              as: "episodes",
            },
          ],
        },
      ],
      where: {
        id,
      },
    });

    if (!userFound) return res.status(404).json({ error: "User not found" });

    res.status(200).json(userFound.favorites);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userFound = await Users.findOne({
      attributes: ["id", "email", "role", "avatar", "userName"],
      order: [["id", "DESC"]],
      group: [
        sequelize.col("favorites.id"),
        sequelize.col("Users.id"),
        sequelize.col("favorites->manga_fav.UserId"),
        sequelize.col("favorites->manga_fav.MangaId"),
      ],
      include: [
        {
          duplicating: false,
          model: Mangas,
          as: "favorites",
          group: [sequelize.col("Mangas.id")],
          attributes: [
            "id",
            "title",
            "description",
            "image",
            "type",
            "demography",
            [
              sequelize.fn(
                "max",
                sequelize.col("favorites->episodes.capNumber")
              ),
              "lastChapter",
            ],
          ],
          include: [
            {
              duplicating: false,
              required: true,
              model: Episodes,
              attributes: [],
              as: "episodes",
            },
          ],
        },
      ],
      where: {
        id,
      },
    });

    if (!userFound) return res.status(400).json({ error: "User not found" });

    res.status(200).json({ user: userFound });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteFavorite = async (req, res) => {
  try {
    const { idContent, idUser } = req.body;

    const userFound = await Users.findByPk(idUser);

    if (!userFound) {
      return res.status(400).json({ error: "User not found" });
    }
    let content;

    content = await Mangas.findByPk(idContent);
    const manga = MangaFav.destroy({
      where: { UserId: idUser, MangaId: idContent },
      force: true,
    });

    res.status(200).json(content);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateUserData = async (req, res) => {
  const { userName, paypal } = req?.body;

  const img = req?.files?.avatar;
  const { id } = req?.params;

  const userFind = await Users.findByPk(id);

  if (!userFind) {
    return res.status(400).json({ error: "Usuario Inexistente" });
  }

  const newUser = {
    userName,
    paypal,
  };

  if (!img) {
    newUser.avatar = userFind.avatar;
  } else {
    const hash = uuidv4() + "_";
    deleteImage(userFind.avatar, "users");
    let pathImage = __dirname + "/../../public/users/" + hash + img?.name;
    img?.mv(pathImage);
    newUser.avatar = `${process.env.API_URL}/users/` + hash + img?.name;
  }

  const updateData = await Users.update(newUser, {
    where: {
      id: id,
    },
    returning: true,
    plain: true,
  });

  delete updateData[1].dataValues.password;
  delete updateData[1].dataValues.paypal;

  res.json(updateData[1].dataValues);
};
