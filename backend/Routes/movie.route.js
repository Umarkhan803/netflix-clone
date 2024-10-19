const express = require("express");
const { getTrendingMovie } = require("../controllers/movie.controller");

const router = express.Router();

// trending movies route
router.get("/trending", getTrendingMovie);

module.exports = router;
