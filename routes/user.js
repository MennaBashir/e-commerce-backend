import express from "express";
import { getAllUsers, loginUser, registerUser } from "../controllers/user.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { allowedTo } from "../middleware/allowedTo.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(verifyToken, allowedTo("admin"), getAllUsers);

export default router;
