import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const customerSchema = mongoose.Schema(
  {
    member_id: {
      //รหัสบัตรสมาชิก (5 ตัวขึ้นไป)
      type: String,
      unique: true,
    },
    firstname: {
      //ชื่อ
      type: String,
      required: true,
    },
    lastname: {
      //นามสกุล
      type: String,
      required: true,
    },
    sex: {
      //เพศ
      type: String,
      required: true,
    },
    phone: {
      //เบอร์มือถือ
      type: String,
    },
    //ที่อยู่
    address: {
      country: { type: String }, //ประเทศ
      province: { type: String }, //จังหวัด/รัฐ
      district: { type: String }, //อำเภอ
      address: { type: String }, //ที่อยู่
      zipcode: { type: String }, //รหัสไปรษณีย์
    },
    //ข้อมูลเสริม
    other: {
      id_card: { type: String }, //หมายเลขบัตรประชาชน
      email: { type: String }, //อีเมล
      line_id: { type: String }, //ไลน์ไอดี
    },
    //ระดับราคา & แต้มสะสม
    level: {
      level_price: { type: String }, //ระดับราคา
      score: { type: Number }, //แต้มปัจจุบัน
    },
    //ข้อมูลบริษัท (นิติบุคคล)
    company: {
      storename: { type: String }, //ชื่อบริษัท
      taxid: { type: String }, //เลขประจำตัวผู้เสียภาษี
      company_email: { type: String }, //อีเมล *ไม่บังคับ
      company_phonenumber: { type: String }, //เบอร์มือถือ
      company_country: { type: String }, //ประเทศ
      company_province: { type: String }, //จังหวัด/รัฐ
      company_address: { type: String }, //ที่อยู่
      company_zipcode: { type: String }, //รหัสไปรษณีย์
    },
  },
  {
    timestamps: true,
  }
);
customerSchema.plugin(mongoosePaginate);
const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
