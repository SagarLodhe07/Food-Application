const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRES: process.env.JWT_EXPIRES,
  CLOUDNARY_NAME: process.env.CLOUDNARY_NAME,
  CLOUDNARY_API_KEY: process.env.CLOUDNARY_API_KEY,
  CLOUDNARY_SECRET_KEY: process.env.CLOUDNARY_SECRET_KEY,
};
// # 9zs0EUXSr1GQv3PG
// # sagar1990ku
