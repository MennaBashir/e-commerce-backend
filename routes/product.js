import express from "express";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { allowedTo } from "../middleware/allowedTo.js";

const router = express.Router();

router.route("/").get(getProducts).post(verifyToken, allowedTo("admin"),addProduct);
router.route("/:id").put(verifyToken, allowedTo("admin"),updateProduct).delete(verifyToken, allowedTo("admin"),deleteProduct);

export default router;
