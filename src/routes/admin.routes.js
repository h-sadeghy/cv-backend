import express from "express";

import { requireAuth, requireAdmin } from "./../middlewares/auth.middleware.js";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/admin/products.controller.js";

const router = express.Router();

router.use(requireAuth, requireAdmin);
router.get("/me", requireAuth, (req, res) => {
  res.json({
    admin: req.admin,
  });
});

router.post("/products", requireAuth, requireAdmin, createProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
