const axios = require("axios");
const ENV_VARS = require("../config/config");

const fetchFromTmbd = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
    },
  };

  const response = await axios.get(url, options);

  if (response.status !== 200) {
    throw new Error("Failed to fetch data from TMDB  " + response.statusText);
  }
  return response.data;
};

module.exports = fetchFromTmbd;
