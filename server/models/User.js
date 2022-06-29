import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
      dafault: "",
    },
    city: {
      type: String,
      max: 50,
      default: "",
    },
    nationality: {
      type: String,
      max: 50,
      default: "",
    },
    course: {
      type: String,
      max: 50,
      dafault: "",
    },
    mobile: {
      type: String,
      max: 20,
      unique: true,
      dafault: "",
    },
    facebook: {
      type: String,
      max: 50,
      dafault: "",
    },
    twitter: {
      type: String,
      max: 50,
      dafault: "",
    },
    instagram: {
      type: String,
      max: 50,
      dafault: "",
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);