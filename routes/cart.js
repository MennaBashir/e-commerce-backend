import express from "express";
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from "../controllers/cart.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { allowedTo } from "../middleware/allowedTo.js";

const router = express.Router();

router.route("/:userId").get(verifyToken, getCartItems);
router.route("/:userId/items").put(verifyToken, allowedTo("admin"), addToCart);
router.route("/:userId/items/:productId").delete(verifyToken, allowedTo("admin"), removeFromCart);

export default router;
