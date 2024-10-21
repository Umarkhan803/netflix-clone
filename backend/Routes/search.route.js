const express = require("express");
const {
  searchPerson,
  getSearchHistory,
  removeItemFromSearchHistory,
  searchTv,
} = require("../controllers/search.controller");

const router = express.Router();

// search person or actor  router
router.get("/person/:query", searchPerson);

// search movie router
router.get("/movie/:query", searchMovie);

// search tv show router
router.get("/tv/:query", searchTv);

// get search history
router.get("/history", getSearchHistory);

// delete search history
router.delete("/history/:id", removeItemFromSearchHistory);

// export route
module.exports = router;
