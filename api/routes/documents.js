import express from "express";
import multer from "multer";
import Document from "../models/Document.js";
import authMiddleware from "../middleware/auth.js"; // Import auth middleware

const router = express.Router();

// ✅ Debug: Log when the document routes are loaded
console.log("📂 Document Routes Loaded");

// ✅ Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("📥 Upload Destination:", "uploads/"); // ✅ Debug log
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + "-" + file.originalname;
    console.log("📄 Generated Filename:", filename); // ✅ Debug log
    cb(null, filename);
  },
});

const upload = multer({ storage });

// ✅ Upload a Document (Protected Route)
router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  console.log("📤 File Upload Request Received"); // ✅ Debugging log

  try {
    if (!req.file) {
      console.log("❌ No file uploaded"); // ✅ Debug log
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { originalname, mimetype, size } = req.file;
    const fileUrl = `/uploads/${filename}`;

    console.log("📑 File Details:", { originalname, mimetype, size, fileUrl }); // ✅ Debug log

    const newDocument = new Document({
      userId: req.user.userId,
      name: originalname,
      type: mimetype,
      size: `${(size / 1024).toFixed(2)} KB`,
      createdAt: new Date(),
      fileUrl,
    });

    await newDocument.save();
    console.log("✅ Document Saved to Database:", newDocument); // ✅ Debug log

    res.status(201).json({ message: "Document uploaded successfully", document: newDocument });
  } catch (error) {
    console.error("🔥 File Upload Error:", error); // ✅ Debug log
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get All Uploaded Documents (Protected Route)
router.get("/", authMiddleware, async (req, res) => {
  console.log("📂 Fetching All Documents"); // ✅ Debug log

  try {
    const documents = await Document.find();
    console.log("📜 Retrieved Documents:", documents); // ✅ Debug log
    res.json(documents);
  } catch (error) {
    console.error("🔥 Fetch Documents Error:", error); // ✅ Debug log
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
