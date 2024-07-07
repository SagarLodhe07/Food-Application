const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      trim:true,
      required: [true, "Product is required"],
      minlength: [5, "Product name must be atleast 5"],
    },
    productImage: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    category: {
      type: String,
      enum: ["veg", "non-veg", "drinks", "sides"],
      default: "veg",
    },
    quantity:{
      type:Number,
      require:true,
      default:10
    },
    inStock: {
      type: Boolean,
      required: [true, "in stock status is require"],
      default: true,
    },
    descripition: {
      type: String,
      minlength: [5,"Product name must be atleast 5"],
    },
  },
  { timestamps: true }
);

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;
