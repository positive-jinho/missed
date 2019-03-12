import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required"
  },
  title: {
    type: String,
    required: "Title is required"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  downloadCnt: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  }
});

const model = mongoose.model("Photo", photoSchema);

export default model;
