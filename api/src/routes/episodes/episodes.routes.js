import {
  createEpisode,
  deleteEpisode,
  getEpisode,
  getImages,
  updateEpisode,
} from "../../controllers/episodes/episodes.controllers.js";
import { Router } from "express";

const router = Router();

router.post("/episodes", createEpisode);
router.get("/episode/images", getImages); // Entra por Query
router.get('/episode/:id', getEpisode);
router.delete('/episode/:id', deleteEpisode);
router.put('/episode/:id', updateEpisode);

export default router;
