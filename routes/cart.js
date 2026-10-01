import express from "express";
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from "../controllers/cart.js";

const router = express.Router();

router.route("/:userId").get(getCartItems);
router.route("/:userId/items").put(addToCart);
router.route("/:userId/items/:productId").delete(removeFromCart);

export default router;
