const cloudinary = require("../Config/cloudnaryConfig");
const ProductRepository = require("../Repository/productRepo");
const fs = require("fs/promises");
const InternalServer = require("../Utils/internalServer");
const NotFoundError = require("../Utils/notfounderror");

async function createProductService(productDetails) {
  const imagePath = productDetails.imagePath;

  if (imagePath) {
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
      //   console.log(cloudinaryResponse);
      var productImage_URL = cloudinaryResponse.secure_url;
      await fs.unlink(imagePath);
      // await fs.unlink(process.cwd() + '/', + imagePath);

    } catch (error) {
      console.log(error);
      // throw { reason: "can not create product", statusCode: 500 };
      throw new InternalServer();
    }
  }

  const product = await ProductRepository.createProduct({
    ...productDetails,
    productImage: productImage_URL,
  });

  if (!product) {
    // throw { reason: "can not create product", statusCode: 500 };
    throw new NotFoundError("Product");
  }
  return product;
}

async function getProductById(productID) {
  const response = await ProductRepository.getProductByID(productID);

  if (!response) {
    // throw { reason: "Not able to find the product", statusCode: 404 };
    throw new NotFoundError("Product");
  }
  return response;
}

async function deleteProductByID(productID) {
  const response = await ProductRepository.deleteProductByID(productID);

  if (!response) {
    // throw { reason: "Can not delete product", statusCode: 500 };
      throw new NotFoundError('Product')
  }
  return response;
}

module.exports = {
  createProductService,
  getProductById,
  deleteProductByID,
};
