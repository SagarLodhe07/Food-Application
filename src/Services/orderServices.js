const { getCartByID, clearCart } = require("../Repository/cartRepository");
const {
  createOrder,
  getOrderbyOrderId,
  getOrdersbyUserId,
  updateOrderStatus,
} = require("../Repository/orderRepository");
const { findUser } = require("../Repository/userRepo");
const BadRequest = require("../Utils/badRequest");
const InternalServer = require("../Utils/internalServer");
const NotFoundError = require("../Utils/notfounderror");

async function createNeworder(userID, paymentMethod) {
  const cart = await getCartByID(userID);
  const user = await findUser({ _id: cart.user });
  if (!cart) {
    throw new NotFoundError("Cart");
  }
  if (cart.items.length === 0) {
    throw new BadRequest(["cart is Empty Place order"]);
  }

  const orderObject = {};

  orderObject.user = cart.user;
  orderObject.items = cart.items.map((cartItem) => {
    return { product: cartItem.product._id, quantity: cartItem.quantity };
  });
  orderObject.status = "ORDERED";
  orderObject.totalPrice = 0;

  cart.items.forEach((cartItem) => {
    orderObject.totalPrice += cartItem.quantity * cartItem.product.price;
  });
  orderObject.address = user.address;
  orderObject.paymentMethod = paymentMethod;
  const order = await createOrder(orderObject);
  if (!order) {
    throw new InternalServer();
  }
  await clearCart(userID);

  return order;
}

async function getAllOrdercreatedByUser(userID) {
  const orders = await getOrdersbyUserId(userID);
  if (!orders) {
    throw new NotFoundError("Orders");
  }
  return orders;
}

async function getOrderDetailsByID(orderID) {
  const order = await getOrderbyOrderId(orderID);
  if (!order) {
    throw new NotFoundError("Orders");
  }
  return order;
}
async function updateOrder(orderID, status) {
  const order = await updateOrderStatus(orderID, status);
  if (!order) {
    throw new NotFoundError("Orders");
  }
  return order;
}

module.exports = {
  createNeworder,
  getAllOrdercreatedByUser,
  getOrderDetailsByID,
  updateOrder,
};
