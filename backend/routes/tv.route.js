import express from "express";
import {
  getSimilarTvs,
  getTrendingTv,
  getTvDetails,
  getTvsByCategory,
  getTvTrailers,
} from "../controllers/tv.controller.js";

const router = express.Router();

// trending movies route
router.get("/trending", getTrendingTv);

// trailers route
router.get("/:id/trailers", getTvTrailers);

// details route
router.get("/:id/details", getTvDetails);

// similar movies router
router.get("/:id/similar", getSimilarTvs);

// category  router
router.get("/:category", getTvsByCategory);

export default router;
