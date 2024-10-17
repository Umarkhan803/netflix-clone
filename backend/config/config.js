const dotenv = require("dotenv");

dotenv.config();
const ENV_VARS = {
  DATABASE_URI: process.env.DATABASE_URI,
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
};

module.exports = ENV_VARS;
