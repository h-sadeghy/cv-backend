import express from "express";
import {
  getCertById,
  getCerts,
} from "../controllers/certificates.controller.js";

const router = express.Router();

/* ================= PUBLIC ================= */
router.get("/", getCerts); // all certs
router.get("/:slug", getCertById); // by id or slug

export default router;
