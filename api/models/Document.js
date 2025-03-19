import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Associates doc with user
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  fileUrl: { type: String, required: true }, // Path or Cloud Storage URL
});

export default mongoose.model("Document", documentSchema);