import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/admin.model.js";
import { signToken } from "../utils/jwt.js";
import { adminLogin } from "../controllers/admin/auth.controller.js";

const router = express.Router();

router.post("/login", adminLogin);

export default router;
