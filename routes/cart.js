import express from "express";
import { addToCart, getCartItems, removeFromCart } from "../controllers/cart.js";

const router = express.Router();

router.route("/").get(getCartItems).post(addToCart);
router.route("/:id").delete(removeFromCart);

export default router;
