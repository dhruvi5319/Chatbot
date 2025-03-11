import express from "express";
import { register, login, getCurrentUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ✅ PUBLIC ROUTES (DO NOT REQUIRE AUTHENTICATION)
router.post("/register", register);
router.post("/login", login);

// ✅ PROTECTED ROUTES (REQUIRE AUTH TOKEN)
router.get("/me", authMiddleware, getCurrentUser);

export default router;