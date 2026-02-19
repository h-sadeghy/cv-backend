import express from "express";
import { getOrders, getOrdById } from "../controllers/orders.controller.js";
const router = express.Router();

/* ================= PUBLIC ================= */
router.get("/", getOrders); // all certs
router.get("/:id", getOrdById); // by id or slug

export default router;
