import { Router } from "express";
import {
  createManga,
  getMangas,
  getMangaById,
  getDashboardData,
  deleteManga,
  updateManga,
  bulkDeleteManga,
} from "../../controllers/Manga/manga.controllers.js";

const router = Router();

// Routes

router.post("/mangas", createManga);
router.get("/manga", getMangas);
router.get("/dashboard", getDashboardData);
router.get("/manga/:id", getMangaById); 
router.delete('/manga/:id', deleteManga);
router.delete('/manga/bulk/delete', bulkDeleteManga);
router.put('/manga/:id', updateManga);



export default router;
