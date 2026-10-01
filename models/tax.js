import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
    default: 0,
  },
  country: {
    type: String,
  }, 
  region: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("TAX", schema);
