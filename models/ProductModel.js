import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = mongoose.Schema(
  {
    user_create: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    product_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    cost: {
      type: Number,
    },
    price: {
      type: Number,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },

    categorys: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    stock: {
      type: Number,
    },
    units: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
    },

    weight: {
      type: Number,
    },
    barcode_code: {
      type: String,
    },
    cost_discount_price: {
      type: Number,
    },
    min_stock: {
      type: Number,
    },
    enable_rounding: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);
productSchema.plugin(mongoosePaginate);
const Product = mongoose.model("Product", productSchema);
export default Product;
