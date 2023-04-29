import { Router } from "express";
import {
  filtersGeneral,
  pagination,
  filterTitle,
} from "../../controllers/filter/filter.controllers.js";
const router = Router();

router.get("/filter", filtersGeneral); // query
router.get("/filter/pagination", pagination); // query
router.get("/filter/title", filterTitle); // query

export default router;
