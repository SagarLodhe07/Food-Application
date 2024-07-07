const { getCartByID, clearCart } = require("../Repository/cartRepository");
const { getProductByID } = require("../Repository/productRepo");
const AppError = require("../Utils/appError");
const BadRequest = require("../Utils/badRequest");
const NotFoundError = require("../Utils/notfounderror");

async function getCart(userID) {
  const cart = await getCartByID(userID);
  if (!cart) {
    throw new NotFoundError("Cart");
  }
  return cart;
}

async function modifyCart(userID, productID, shouldAdd = true) {
  const quantityValue = shouldAdd == true ? 1 : -1;
  const cart = await getCart(userID);
  const product = await getProductByID(productID);
  if (!product) {
    throw new NotFoundError("Product");
  }
  if (!product.inStock && product.quantity <= 0) {
    throw new BadRequest(["Product not available in stock"]);
  }

  let foundProduct = false;

  cart.items.forEach((item) => {
    item.product._id == productID;
    if (shouldAdd) {
      if (product.quantity >= item.quantity + 1) {
        item.quantity += quantityValue;
      } else {
        throw new AppError("Quantity not available", 404);
      }
    } else {
      if (item.quantity > 0) {
        item.quantity += quantityValue;
        if (item.quantity == 0) {
          cart.items = cart.items.filter(
            (item) => item.product._id != productID
          );
          foundProduct = true;
          return;
        }
      } else {
        throw new AppError("Quantity not available", 404);
      }
    }

    foundProduct = true;
  });
  if (!foundProduct) {
    if (shouldAdd) {
      cart.items.push({
        product: productID,
        quantity: 1,
      });
    } else {
      throw new NotFoundError("Product");
    }
  }
  await cart.save();
  return cart;
}

async function clearProductFromCart(userID) {
  const response =  await clearCart(userID)
  return response;
}
module.exports = {
  getCart,
  modifyCart,
  clearProductFromCart
};
