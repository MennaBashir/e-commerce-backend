import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { allowedTo } from "../middleware/allowedTo.js";

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(verifyToken, allowedTo("admin"), addCategory);
router
  .route("/:id")
  .put(verifyToken, allowedTo("admin"), updateCategory)
  .delete(verifyToken, allowedTo("admin"), deleteCategory);

export default router;
