import express from "express";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.js";

const router = express.Router();

router.route("/").get(getProducts).post(addProduct);
router.route("/:id").put(updateProduct).delete(deleteProduct);

export default router;
