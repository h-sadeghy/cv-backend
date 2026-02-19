import express from "express";

import { requireAuth, requireAdmin } from "./../middlewares/auth.middleware.js";
import {
  getOrderBySlug,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/admin/orders.controller.js";

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get("/orders", getOrderBySlug);
router.post("/orders", createOrder);
router.put("/orders/:id", updateOrder);
router.delete("/orders/:id", deleteOrder);

export default router;
