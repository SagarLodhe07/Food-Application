const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: {
          required: true,
          type: Number,
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["ORDERED", "PROCESSING", "OUT FOR DELIVERY", "CANCELLED"],
      default: "ORDERED",
    },
    address: {
      type: String,
      enum: [10, "address length minimum 10 character"],
    },
    payment: {
      type: String,
      enum: ["CASH", "ONLINE"],
      default: "CASH",
    },
  },
  { timestamps: true }
);

const OrderSchema = mongoose.model("Order", orderSchema);

module.exports = OrderSchema;
