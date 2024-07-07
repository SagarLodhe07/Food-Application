const OrderSchema = require("../Schema/orderSchema");
const BadRequest = require("../Utils/badRequest");
const InternalServer = require("../Utils/internalServer");

async function createOrder(orderDetails) {
  try {
    const order = await OrderSchema.create(orderDetails);
    return order;
  } catch (error) {
    if (error.name == "ValidationError") {
      const errorMessageList = Object.keys(error.errors).map((property) => {
        return error.errors[property].message;
      });

      throw new BadRequest(errorMessageList);
    }
    console.log(error.name);
    throw new InternalServer();
  }
}

async function getOrdersbyUserId(userID) {
  try {
    const orders = await OrderSchema.find({ user: userID }).populate(
      "items.product"
    );
    return orders;
  } catch (error) {
    console.log(error);
    throw new InternalServer();
  }
}
async function getOrderbyOrderId(orderID) {
  try {
    const order = await OrderSchema.findById(orderID).populate("items.product");
    return order;
  } catch (error) {
    console.log(error);
    throw new InternalServer();
  }
}

/**Cancel Order */
async function updateOrderStatus(orderID, status) {
  try {
    const order = await OrderSchema.findByIdAndUpdate(
      orderID,
      {
        status: status,
      },
      { new: true }
    );
    return order;
  } catch (error) {
    console.log(error);
    throw new InternalServer();
  }
}

module.exports = {
  createOrder,
  getOrderbyOrderId,
  getOrdersbyUserId,
  updateOrderStatus,
};
