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
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: { 
    type: Number,
  },
});

export default mongoose.model("CART", schema);
