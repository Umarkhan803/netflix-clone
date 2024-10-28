import express from "express";
import {
  getMovieDetails,
  getMoviesByCategory,
  getMovieTrailers,
  getSimilarMovies,
  getTrendingMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

// trending movies route
router.get("/trending", getTrendingMovie);

// trailers route
router.get("/:id/trailers", getMovieTrailers);

// details route
router.get("/:id/details", getMovieDetails);

// similar movies router
router.get("/:id/similar", getSimilarMovies);

// category  router
router.get("/:category", getMoviesByCategory);

export default router;
