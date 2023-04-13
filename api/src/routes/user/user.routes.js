import { Router } from "express";
// ----------------------------------------------------------------
import {
  createUser,
  loginUser,
  getUser,
  addFavorite,
  getFavorites,
  deleteFavorite,
  updateUserData,
} from "../../controllers/users/user.controller.js";

const router = Router();

router.post("/register", createUser);
router.get("/getuserid/:id", getUser);
router.post("/login", loginUser); // Pendiente por testear y validaciones
router.post("/addfavorite", addFavorite);
router.get("/getfavorites/:id", getFavorites);
router.patch("/updateuser/:id", updateUserData); // Pendiente por testear
router.delete("/deletefavorite", deleteFavorite);

export default router;
