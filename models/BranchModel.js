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
const Branch = mongoose.model("Branch", schema);

export default Branch;
