const express = require("express");
const {
  addProduct,
  getProduct,
  deleteProduct,
  AllProductsDetails,
} = require("../Controllers/productControllers");
const uploader = require("../middleware/multer");
const { isLoggedin, isAdmin } = require("../Validation/authValitars");

const productRouter = express.Router();

productRouter.post(
  "/",
  isLoggedin,
  isAdmin,
  uploader.single("productImage"),
  addProduct
);    
productRouter.get("/:id", getProduct);
productRouter.get("/", AllProductsDetails);
productRouter.delete("/:id", deleteProduct);
module.exports = productRouter;
