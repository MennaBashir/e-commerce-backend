import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PRODUCT",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  shippingAddress: {
    street: String,
    city: String,
    zip: String,
    country: String,
  },
  paymentMethod: {
    type: String,
    enum: ["cod", "card"],
    default: "cod",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  orderStatus: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  subtotal: {
    type: Number,
    required: true,
  },
  tax: [
    {
      tax: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TAX",
        required: true,
      },
      taxAmount: {
        type: Number,
        required: true,
      },
    },
  ],

  total: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("ORDER", schema);
