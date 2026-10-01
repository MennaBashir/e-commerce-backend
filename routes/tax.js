import express from "express";
import { addTax, deleteTax, getTaxes, updateTax } from "../controllers/tax.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { allowedTo } from "../middleware/allowedTo.js";

const router = express.Router();

router
  .route("/")
  .get(verifyToken, getTaxes)
  .post(verifyToken, allowedTo("admin"), addTax);
router
  .route("/:id")
  .put(verifyToken, allowedTo("admin"), updateTax)
  .delete(verifyToken, allowedTo("admin"), deleteTax);

export default router;
