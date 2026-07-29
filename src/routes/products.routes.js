import express from "express";
import {
  getProductBySlug,
  getProducts,
} from "../controllers/products.controller.js";

const router = express.Router();

/* ================= PUBLIC ================= */
router.get("/", getProducts); // all certs
router.get("/:slug", getProductBySlug); // by id or slug

export default router;
