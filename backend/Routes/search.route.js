const express = require("express");
const {
  searchPerson,
  searchMovie,
  searchTvShow,
  searchHistory,
  deleteSearchHistory,
} = require("../controllers/search.controller");

const router = express.Router();

// search person or actor  router
router.get("/person/:query", searchPerson);

// search movie router
router.get("/movie/:query", searchMovie);

// search tv show router
router.get("/tv/:query", searchTvShow);

// get search history
router.get("/history", searchHistory);

// delete search history
router.delete("/history/:id", deleteSearchHistory);

// export route
module.exports = router;
