import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import Admin from "./models/admin.model.js";
import certificatesRoutes from "./routes/certificates.routes.js";
import authRoutes from "./routes/auth.routes.js";
import {
  getCertById,
  getCerts,
} from "./controllers/certificates.controller.js";
import ordersRoutes from "./routes/products.routes.js";
import adminRoutes from "./routes/admin.routes.js";
const PORT = process.env.PORT || 5000;
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://cv-nine-kappa-74.vercel.app",
];
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "static")));

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/", (req, res) => {
  res.status(200).send("API is running");
});
app.use("/api/certificates", certificatesRoutes);
app.use("/api/products", ordersRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
export default app;
