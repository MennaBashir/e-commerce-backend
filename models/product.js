import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
  },
  // category will store id of the category whose product is being added
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CATEGORY",
    required: true,
  },
  image: {
    type: String,
  },
});

export default mongoose.model("PRODUCT", schema);
