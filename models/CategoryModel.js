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
const Category = mongoose.model("Category", schema);

export default Category;
