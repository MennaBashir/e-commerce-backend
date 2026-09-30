import express from "express";
import {
  getOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order.js";

const router = express.Router();

router.route("/").get(getOrders).post(addOrder);

router.route("/:id").get(getOrderById).put(updateOrder).delete(deleteOrder);

export default router;
