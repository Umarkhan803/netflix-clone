const express = require("express");
const {
  getTrendingMovie,
  getTrailers,
  getDetails,
} = require("../controllers/movie.controller");

const router = express.Router();

// trending movies route
router.get("/trending", getTrendingMovie);

// trailers route
router.get("/:id/trailers", getTrailers);

// trailers route
router.get("/:id/details", getDetails);

module.exports = router;
