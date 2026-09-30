import express from "express";
import { addTax, deleteTax, getTaxes, updateTax } from "../controllers/tax.js";

const router = express.Router();

router.route("/").get(getTaxes).post(addTax);
router.route("/:id").put(updateTax).delete(deleteTax);

export default router;