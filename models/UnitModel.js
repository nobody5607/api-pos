import mongoose from "mongoose";
const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Unit = mongoose.model("Unit", schema);

export default Unit;
