const {
  CLOUDNARY_NAME,
  CLOUDNARY_SECRET_KEY,
  CLOUDNARY_API_KEY,
} = require("./serverConfig");

const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: CLOUDNARY_NAME,
  api_secret: CLOUDNARY_SECRET_KEY,
  api_key: CLOUDNARY_API_KEY,
});

module.exports = cloudinary