import express from "express";

import { requireAuth, requireAdmin } from "./../middlewares/auth.middleware.js";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/admin/products.controller.js";
import {
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../controllers/admin/order.controller.js";

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.post("/products", createProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.get("/orders", getAllOrders);
router.get("/orders/:id", getOrderById);
router.patch("/orders/:id", updateOrder);
router.delete("/orders/:id", deleteOrder);
export default router;
