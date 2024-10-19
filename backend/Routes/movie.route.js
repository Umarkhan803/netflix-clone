const express = require("express");
const {
  getTrendingMovie,
  getTrailers,
} = require("../controllers/movie.controller");

const router = express.Router();

// trending movies route
router.get("/trending", getTrendingMovie);

// trailers route
router.get("/:id/trailers", getTrailers);

module.exports = router;
