const fetchFromTmbd = require("../services/tmbb.services");

// getting trending movie
const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromTmbd(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    //getting random movies
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({ success: true, content: randomMovie });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error in TMDB" });
    console.log(error.message);
  }
};

// getting movie trailers
const getTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTmbd(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res
      .status(500)
      .json({ success: false, message: "Internal server Error in trailers" });
    console.log(error.message);
  }
};

// getting movie details
const getDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTmbd(
      `https://api.themoviedb.org/3/person/${id}?language=en-US`
    );
    res.json({ success: true, details: data });
    console.log(data);
  } catch (error) {
    if (error.message.include("404")) {
      return res.status(404).send(null);
    }
    res
      .status(500)
      .json({ success: false, message: "Internal server Error in details" });
  }
};
module.exports = { getTrendingMovie, getTrailers, getDetails };
