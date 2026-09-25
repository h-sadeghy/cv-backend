import express from "express";
import {
  createOrder,
  getOrder,
  verifyOrder,
} from "../controllers/orders.controller.js";

const router = express.Router();

router.get("/verify", verifyOrder);
router.post("/", createOrder);
router.get("/:id", getOrder);

export default router;
