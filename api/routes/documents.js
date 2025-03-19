import express from "express";
import multer from "multer";
import axios from "axios";
import authMiddleware from "../middleware/auth.js";
import FormData from "form-data";
import fs from "fs";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory

// ✅ Upload and send to FastAPI
router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("📤 Uploading file:", req.file.originalname);

    // Create FormData to send to FastAPI
    const formData = new FormData();
    formData.append("file", req.file.buffer, req.file.originalname);

    // ✅ Forward file to FastAPI for processing
    const fastApiResponse = await axios.post(
      "http://localhost:5002/api/documents/upload", // FastAPI endpoint
      formData,
      { headers: { "Content-Type": "multipart/form-data"  } }
    );

    return res.status(200).json(fastApiResponse.data);
  } catch (error) {
    console.error("🔥 Upload failed:", error);
    return res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

export default router;
