// import files modules >
const express = require("express");
const app = express();
const ENV_VARS = require("./config/config");
const connectDB = require("./config/connectdb");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

// import files  >
const authRoutes = require("./Routes/auth.route");
const moviesRoute = require("./Routes/movie.route");
const tvRoute = require("./Routes/tvRoute");
const searchRoute = require("./Routes/search.route");
const protectRoute = require("./middleware/protectRoute");
app.use(express.json());
app.use(cookieParser());
const PORT = ENV_VARS.PORT;

// routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", protectRoute, moviesRoute);
app.use("/api/tv", protectRoute, tvRoute);
app.use("/api/search", protectRoute, searchRoute);

// server is up
app.listen(PORT, () => {
  console.log(`Server is up on port http://localhost:${PORT}`);
  connectDB();
});
