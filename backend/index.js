// import files modules >
const express = require("express");
const app = express();
const ENV_VARS = require("./config/config");
const connectDB = require("./config/connectdb");
const dotenv = require("dotenv");

dotenv.config();

// import files  >
const authRoutes = require("./Routes/auth.route");
const moviesRoute = require("./Routes/movie.route");
app.use(express.json());

const PORT = ENV_VARS.PORT;

// routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", moviesRoute);

// server is up
app.listen(PORT, () => {
  console.log(`Server is up on port http://localhost:${PORT}`);
  connectDB();
});
