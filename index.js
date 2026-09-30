import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import usersRouter from "./routes/user.js";
import cartRouter from "./routes/cart.js";
import categoryRouter from "./routes/category.js";
import productRouter from "./routes/product.js";
import orderRouter from "./routes/order.js";
import taxRouter from "./routes/tax.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const url = process.env.MONGO_URL;

app.use(cors());
app.use(express.json()); // handle any body request to json

app.use("/api/categories", categoryRouter);
app.use("/api/taxes", taxRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

async function start() {
  try {
    if (!url) {
      throw new Error(
        "MongoDB URL is not defined in the environment variables.",
      );
    }
    await mongoose.connect(url);
    app.listen(port);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
}
start();
