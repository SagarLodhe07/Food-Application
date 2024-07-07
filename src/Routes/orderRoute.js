const express = require("express");
const { isLoggedin, isAdmin } = require("../Validation/authValitars");
const {
  generateNewOrder,
  getAllOrderByUser,
  getOrder,
  cancelOrder,
  changeOrderStatus,

} = require("../Controllers/orderControllers");

const orderRouter = express.Router();
orderRouter.post("/", isLoggedin, generateNewOrder);
orderRouter.get("/", isLoggedin, getAllOrderByUser);
orderRouter.get("/:orderID", isLoggedin, getOrder);
orderRouter.put("/:orderID/cancel", isLoggedin, cancelOrder);
orderRouter.put("/:orderID/status", isLoggedin, isAdmin, changeOrderStatus);

module.exports = orderRouter;
