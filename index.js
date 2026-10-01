import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import usersRouter from "./routes/user.js";
import cartRouter from "./routes/cart.js";
import categoryRouter from "./routes/category.js";
import productRouter from "./routes/product.js";
import taxRouter from "./routes/tax.js";
import { ERROR } from "./utils/httpStatus.js";

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

// handle route not found
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Route ${req.originalUrl} not found`,
  });
});

// handle error globaly
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status || ERROR,
    message: err.message,
  });
});

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
