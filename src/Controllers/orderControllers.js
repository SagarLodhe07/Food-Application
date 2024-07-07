const {
  createNeworder,
  getAllOrdercreatedByUser,
  getOrderDetailsByID,
  updateOrder,
} = require("../Services/orderServices");
const AppError = require("../Utils/appError");

async function generateNewOrder(req, res) {
  try {
    const order = await createNeworder(req.user.id, req.body.paymentMethod);

    return res.status(201).json({
      message: "Successfully created order",
      success: true,
      data: order,
      error: {},
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: {},
        error: error,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      error: error,
    });
  }
}
async function getAllOrderByUser(req, res) {
  try {
    const order = await getAllOrdercreatedByUser(req.user.id);

    return res.status(200).json({
      message: "Successfully fetched orders",
      success: true,
      data: order,
      error: {},
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: {},
        error: error,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      error: error,
    });
  }
}
async function getOrder(req, res) {
  try {
    const order = await getOrderDetailsByID(req.params.orderID);

    return res.status(200).json({
      message: "Successfully fetched Order",
      success: true,
      data: order,
      error: {},
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: {},
        error: error,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      error: error,
    });
  }
}
async function cancelOrder(req, res) {
  try {
    const order = await updateOrder(req.params.orderID, "CANCELLED");

    return res.status(200).json({
      message: "Successfully Updated the Order",
      success: true,
      data: order,
      error: {},
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: {},
        error: error,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      error: error,
    });
  }
}
async function changeOrderStatus(req, res) {
  try {
    const order = await updateOrder(req.params.orderID, req.body.status);

    return res.status(200).json({
      message: "Successfully Updated the Order",
      success: true,
      data: order,
      error: {},
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: {},
        error: error,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      error: error,
    });
  }
}
module.exports={
  generateNewOrder,
  getAllOrderByUser,
  changeOrderStatus,
  getOrder,
  cancelOrder,

}