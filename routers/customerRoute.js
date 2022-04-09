import express from "express";
import { Auth } from "../middlewere/Auth";
import Customer from "../models/CustomerModel";
// import moment from "moment";
const customerRoute = express.Router();

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

customerRoute.get("/search/:id", Auth, async (req, res) => {
  try {
    let { id } = req.params;
    let result = await Customer.findOne({ member_id: id });
    if (!result) {
      res.json({ status: "warning", data: [], message: "ไม่พบข้อมูลลูกค้า" });
    }
    res.json({ status: "success", data: result ? result : [] });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

customerRoute.get("/", Auth, async (req, res) => {
  try {
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page - 1, size);
    var options = {
      populate: [],
      lean: true,
      offset: offset,
      limit: limit,
    };
    let condition = {};
    const result = await Customer.paginate(condition, options);
    res.json({
      status: "success",
      data: result.docs,
      total: result.totalDocs,
      totalPages: result.totalPages,
      currentPage: result.page,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

customerRoute.get("/:id", Auth, async (req, res) => {
  try {
    let { id } = req.params;
    let result = await Customer.findById(id);
    res.json({ status: "success", data: result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});
customerRoute.post("/", Auth, async (req, res) => {
  try {
    let { data } = req.fields;
    if (data) {
      data = JSON.parse(data);
      const { member_id } = data;
      const checkCustomer = await Customer.findOne({ member_id: member_id });
      if (checkCustomer) {
        res.json({
          status: "error",
          message: `รหัสสมาชิก ${member_id} ถูกใช้งานแล้ว`,
        });
      }
      const result = await Customer.create(data);
      res.json({ status: "success", data: result });
    } else {
      res.json({ status: "error", message: "ไม่พบข้อมูล" });
    }
  } catch (error) {
    res.json({ message: error.message });
    console.log(error);
  }
});

customerRoute.put("/:id", Auth, async (req, res) => {
  try {
    let { data } = req.fields;
    let { id } = req.params;

    if (data) {
      data = JSON.parse(data);
      const { member_id } = data;
      const checkCustomer = await Customer.findOne({
        _id: id,
        member_id: { $ne: member_id }, //not
      });

      if (checkCustomer) {
        res.json({
          status: "error",
          message: `รหัสสมาชิก ${member_id} ถูกใช้งานแล้ว`,
        });
      }
      const result = await Customer.findOneAndUpdate(
        { _id: id },
        {
          $set: data,
        },
        {
          upsert: true,
          returnDocument: "after", // this is new !
        }
      );

      res.json({ status: "success", data: result });
    } else {
      res.json({ status: "error", message: "ไม่พบข้อมูล" });
    }
  } catch (error) {
    res.json({ message: error.message });
    console.log(error);
  }
});

export default customerRoute;
