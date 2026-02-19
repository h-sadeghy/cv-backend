import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "certificates",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 1600, crop: "limit" }],
  },
});

const upload = multer({ storage });

export default upload;
