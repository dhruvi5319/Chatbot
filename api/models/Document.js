import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  fileUrl: { type: String, required: true }, // Store the file URL
});

export default mongoose.model("Document", documentSchema);
