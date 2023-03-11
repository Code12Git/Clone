import express from "express";
import { usersignup, userLogin } from "../controllers/user-controller.js";

const router = express.Router();

router.post("/register", usersignup);
router.post("/login", userLogin);

export default router;
