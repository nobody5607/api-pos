import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    permission: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    level: {
      type: Number 
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

export default User;
