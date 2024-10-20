const express = require("express");
const {
  getTrendingTv,
  getTvDetails,
  getSimilarTv,
  getTvTrailers,
  getTvByCategory,
} = require("../controllers/tv.controller");

const router = express.Router();
// trending movies route
router.get("/trending", getTrendingTv);

// trailers route
router.get("/:id/trailers", getTvTrailers);

// details route
router.get("/:id/details", getTvDetails);

// similar movies router
router.get("/:id/similar", getSimilarTv);

// category  router
router.get("/:category", getTvByCategory);

module.exports = router;
