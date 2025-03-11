import express from "express";
import multer from "multer";
import Document from "../models/Document.js";
import authMiddleware from "../middleware/auth.js"; // Import auth middleware

const router = express.Router();

// Configure Multer for file storage (Uploads stored in "uploads" folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Local storage folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Upload a Document (Protected Route)
router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { originalname, mimetype, size } = req.file;
    const fileUrl = `/uploads/${req.file.filename}`;

    const newDocument = new Document({
      name: originalname,
      type: mimetype,
      size: `${(size / 1024).toFixed(2)} KB`,
      createdAt: new Date(),
      fileUrl,
    });

    await newDocument.save();

    res.status(201).json({ message: "Document uploaded successfully", document: newDocument });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get All Uploaded Documents (Protected Route)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
