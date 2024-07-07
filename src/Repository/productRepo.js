const Product = require("../Schema/productSchema");
const BadRequest = require("../Utils/badRequest");
const InternalServer = require("../Utils/internalServer");

async function createProduct(productDetails) {
  try {
    const response = await Product.create(productDetails);
    return response;
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
async function getProductByID(productID) {
  try {
    const response = await Product.findById(productID);
    return response;
  } catch (error) {
    console.log(error);
    throw new InternalServer();
  }
}
async function deleteProductByID(productID) {
  try {
    const response = await Product.findByIdAndDelete(productID);
   console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw new InternalServer();
  }
}

module.exports = {
  createProduct,
  getProductByID,
  deleteProductByID,
};
