import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Ensure `.js` extension is included
import authRoutes from "./routes/auth.js"; // Ensure `.js` extension is included
import axios from "axios"; // Import axios for HTTP requests
import documentRoutes from "./routes/documents.js";

const FASTAPI_SERVER = "http://localhost:5002";
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Proxy Route: Forward Chat Queries to FastAPI
app.post('/api/chat/ask', async (req, res) => {
  try {
    const response = await axios.post("http://localhost:5002/api/chat/ask", req.body, {
      headers: { "Content-Type": "application/json" },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error forwarding chat query:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ API to fetch documents from FastAPI
app.get("/api/documents", async (req, res) => {
  try {
    const response = await axios.get(`${FASTAPI_SERVER}/api/documents`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

// ✅ API to receive FastAPI notifications when a new document is uploaded
app.post("/api/refresh-documents", (req, res) => {
  console.log("🔄 Document update received from FastAPI:", req.body.doc_id);
  res.json({ message: "Node.js acknowledged document update" });
});

// Start the Server
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
