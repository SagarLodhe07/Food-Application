const express = require("express");
const { getCartbyUser, modifyToCartbyUser, clearCartByID } = require("../Controllers/cartControll");
const { isLoggedin } = require("../Validation/authValitars");

const cartRouter = express.Router();
cartRouter.get("/", isLoggedin, getCartbyUser);
cartRouter.post("/:operation/:productID", isLoggedin, modifyToCartbyUser);
cartRouter.delete("/products", isLoggedin, clearCartByID);

module.exports = cartRouter;
