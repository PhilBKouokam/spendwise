// backend/routes/upload.js
import express from "express";
import multer from "multer";
import { protect } from "../middleware/auth.js";
import { uploadReceipt } from "../controllers/uploadController.js";

const router = express.Router();
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

router.post(
    "/receipt/:id", 
    protect, 
    upload.single("receipt"), 
    uploadReceipt
);

export default router;