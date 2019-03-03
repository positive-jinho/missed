import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "User Name is Required"
  },
  email: {
    type: String,
    required: "User Email is Required"
  },
  avatarUrl: {
    type: String,
    default: ""
  },
  bio: {
    type: String,
    default: ""
  },
  registeredAt: {
    type: Date,
    default: Date.now
  },
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo"
    }
  ]
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", userSchema);

export default model;
