const Cart = require("../Schema/cartSchema");
const InternalServer = require("../Utils/internalServer");
const NotFoundError = require("../Utils/notfounderror");

async function createCart(userID) {
  try {
    const newCart = await Cart.create({
      user: userID,
    });
    return newCart;
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

async function getCartByID(userID) {
  try {
    const cart = Cart.findOne({
      user: userID,
    }).populate("items.product");
    return cart;
  } catch (error) {
    throw new InternalServer();
  }
}

async function clearCart(userID) {
  try {
    const cart = await Cart.findOne({
      user:userID
    });
    /**If cart not found */
    if (!cart) throw new NotFoundError("cart");

    cart.items = [];//reinslazied new empty array
    await cart.save();
    return cart;
  } catch (error) {
    console.log(error);
    throw new InternalServer();
  }
}
module.exports = {
  createCart,
  getCartByID,
  clearCart,
};
