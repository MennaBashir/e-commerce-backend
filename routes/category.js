import express from "express";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../controllers/category.js";

const router = express.Router();

router.route("/").get(getCategories).post(addCategory);
router.route("/:id").put(updateCategory).delete(deleteCategory);

export default router; 