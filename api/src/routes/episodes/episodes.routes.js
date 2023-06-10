import {
  createEpisode,
  deleteEpisode,
  getImages,
} from "../../controllers/episodes/episodes.controllers.js";
import { Router } from "express";

const router = Router();

router.post("/episodes", createEpisode);
router.get("/episode/images", getImages); // Entra por Query
router.delete('/episode/:id', deleteEpisode);

export default router;
