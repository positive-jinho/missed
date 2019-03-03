import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required"
  },
  title: {
    type: String,
    required: "File URL is required"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("Photo", photoSchema);

export default model;
