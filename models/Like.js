import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  photo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Photo"
  }
});

const model = mongoose.model("Like", likeSchema);

export default model;
