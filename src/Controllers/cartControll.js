const {
  getCart,
  modifyCart,
  clearProductFromCart,
} = require("../Services/cartServices");
const AppError = require("../Utils/appError");

async function getCartbyUser(req, res) {
  try {
    const cart = await getCart(req.user.id);
    return res.status(200).json({
      message: "Cart fetched successfully",
      success: true,
      data: cart,
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

async function modifyToCartbyUser(req, res) {
  try {
    const cart = await modifyCart(
      req.user.id,
      req.params.productID,
      req.params.operation == "add"
    );
    return res.status(200).json({
      message: `successfully ${req.params.operation} to the cart`,
      success: true,
      data: cart,
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

async function clearCartByID(req, res) {
  try {
    const cart = await clearProductFromCart(req.user.id);
    return res.status(200).json({
      message: "successfully deleted the cart",
      success: true,
      data: cart,
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
module.exports = {
  getCartbyUser,
  modifyToCartbyUser,
  clearCartByID
};
