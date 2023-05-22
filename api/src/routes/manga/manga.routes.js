import { Router } from "express";
import {
  createManga,
  getMangas,
  getMangaById,
  getDashboardData,
} from "../../controllers/Manga/manga.controllers.js";

const router = Router();

// Routes

router.post("/mangas", createManga);
router.get("/manga", getMangas);
router.get("/dashboard", getDashboardData);
router.get("/manga/:id", getMangaById); // por params

export default router;
