import mongoose from "mongoose";
// import mongoosePaginate from "mongoose-paginate-v2";
const orderSchema = mongoose.Schema(
  {
    sell: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sell",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        barcode_code: { type: String },
        product_id: { type: String },
        product_name: { type: String },
        product_image: { type: String },
        product_cost: { type: Number }, //ต้นทุน
        product_price: { type: Number }, //ราคาต่อหน่วย
        product_qty: { type: Number },
        total_price: { type: Number }, //ราคารวม
      },
    ],
    discount: {
      discount_type: { type: String }, //%,฿
      discount_price: { type: Number }, //เงินลด
    },
    coupon: {
      coupon_code: { type: String },
      discount: { type: Number },
    },
    vat: { type: Number },
    payment_method: {
      type: String,
      default: "ATM", //atm,credit,prompay
    },
    payment_result: {
      resultCode: { type: String },
      amount: { type: String },
      referenceNo: { type: String },
      gbpReferenceNo: { type: String },
      statusText: { type: String },
      imageSlip: { type: String },
      dateSlip: { type: String },
    },
    price: {
      type: Number, //price
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number, //totalPrice
      required: true,
      default: 0.0,
    },
  },
  {
    timestamps: true,
  }
);
// orderSchema.plugin(mongoosePaginate);
const Order = mongoose.model("Order", orderSchema);

export default Order;
