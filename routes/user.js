import express from "express";
import { getAllUsers, loginUser, registerUser } from "../controllers/user.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(getAllUsers);

export default router;
