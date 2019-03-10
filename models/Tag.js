import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  photo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Photo"
  },
  tag: {
    type: String,
    required: "Tag is Required"
  }
});

const model = mongoose.model("Tag", tagSchema);

export default model;
