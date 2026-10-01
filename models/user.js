import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { 
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  phone: {
    type: String,
  },
  address: [
    {
      label: String,
      street: String,
      city: String,
      zip: String,
      country: String,
    },
  ],
});

export default mongoose.model("USER", schema);
