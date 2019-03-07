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
  tags: {
    type: String,
    required: "Tag is Required"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  likeUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  downloadCnt: {
    type: Number,
    default: 0
  }
});

const model = mongoose.model("Photo", photoSchema);

export default model;
