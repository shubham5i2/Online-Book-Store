const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: Object,
      required: true,
    },
    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    paymentType: {
      type: String,
      default: "COD",
    },
    status: {
      type: String,
      default: "order_placed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
