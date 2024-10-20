const fetchFromTmbd = require("../services/tmbb.services");

// getting trending tv
const getTrendingTv = async (req, res) => {
  try {
    const data = await fetchFromTmbd(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    //getting random tv
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
const getTvTrailers = async (req, res) => {
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
const getTvDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTmbd(
      `https://api.themoviedb.org/3/person/${id}?language=en-US`
    );
    res.status(200).json({ success: true, details: data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server Error in details" });
  }
};
// getting similar movies
const getSimilarTv = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTmbd(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server Error in similar" });
  }
};
//  getting movies category
const getTvByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTmbd(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, category: data.results });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server Error in category" });
  }
};
module.exports = {
  getSimilarTv,
  getTrendingTv,
  getTvDetails,
  getTvTrailers,
  getTvByCategory,
};