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
    console.log(error);
  }
};
// ''
const getTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = fetchFromTmbd(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.include("404")) {
      return res.status(404).send(null);
    }
    res
      .status(500)
      .json({ success: false, message: "Internal server Error in trailers" });
  }
};

module.exports = { getTrendingMovie, getTrailers };
