const express = require("express");
const {
  getTrendingMovie,
  getTrailers,
  getDetails,
  getSimilarMovies,
} = require("../controllers/movie.controller");

const router = express.Router();

// trending movies route
router.get("/trending", getTrendingMovie);

// trailers route
router.get("/:id/trailers", getTrailers);

// details route
router.get("/:id/details", getDetails);

// similar movies router
router.get("/:id/similar", getSimilarMovies);

module.exports = router;
