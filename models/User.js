import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "User Name is Required"
  },
  email: {
    type: String
  },
  avatarUrl: {
    type: String,
    default: null
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
  ],
  kakaoId: Number
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", userSchema);

export default model;
