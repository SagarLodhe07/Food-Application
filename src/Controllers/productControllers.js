const {
  createProductService,
  getProductById,
  deleteProductByID,
} = require("../Services/productService");
const AppError = require("../Utils/appError");

async function addProduct(req, res) {
  try {
    const product = await createProductService({
      productName: req.body.productName,
      price: req.body.price,
      imagePath: req.file?.path,
      category: req.body.category,
      inStock: req.body.inStock,
      descripition: req.body.descripition,
    });
    return res.status(201).json({
      message: "Successfully created Product",
      data: product,
      error: {},
      success: true,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message,
        data: {},
        error: error,
        success: false,
      });
    }
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      error: error,
      success: false,
    });
  }
}

async function getProduct(req, res) {
  try {
    const response = await getProductById(req.params.id);
    return res.status(200).json({
      message: "Successfully fetched Product",
      data: response,
      error: {},
      success: true,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message,
        data: {},
        error: error,
        success: false,
      });
    }
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      error: error,
      success: false,
    });
  }
}
async function deleteProduct(req, res) {
  try {
    const response = await deleteProductByID(req.params.id);
    return res.status(200).json({
      message: "Successfully deleted Product",
      data: response,
      error: {},
      success: true,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message,
        data: {},
        error: error,
        success: false,
      });
    }
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      error: error,
      success: false,
    });
  }
}

module.exports = {
  addProduct,
  getProduct,
  deleteProduct
};
