const User = require("../model/user.model");
const fetchFromTmbd = require("../services/tmbb.services");

// searching person or actor
const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchFromTmbd(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.result[0].name,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("error in search person controller :-", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// searching movie
const searchMovie = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchFromTmbd(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).send(null);
    }
    if ((response.result.length = 0)) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].profile_path,
            title: response.result[0].name,
            searchType: "person",
            createdAt: new Date(),
          },
        },
      });
    }
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("error in search movie controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// searching tv shows
const searchTvShow = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchFromTmbd(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).send(null);
    }
    if ((response.result.length = 0)) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].profile_path,
            title: response.result[0].name,
            searchType: "tv",
            createdAt: new Date(),
          },
        },
      });
    }
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("error in search tv controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const searchHistory = async (req, res) => {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteSearchHistory = async () => {
  const { id } = req.params;
  try {
  } catch (error) {}
};

module.exports = {
  searchPerson,
  searchMovie,
  searchTvShow,
  searchHistory,
  deleteSearchHistory,
};
