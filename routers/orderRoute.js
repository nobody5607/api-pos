import express from "express";
import { Auth } from "../middlewere/Auth";
import Order from "../models/OrderModel";
import { uploadImage } from "../utils/utils";
import moment from "moment";
const orderRoute = express.Router();

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

orderRoute.get("/", async (req, res) => {
  try {
    const { page, size, title, backend } = req.query;
    const { limit, offset } = getPagination(page - 1, size);
    var options = {
      populate: [
        { path: "brand", select: ["brandName"] },
        { path: "category", select: ["categoryName"] },
        { path: "orderStatus", select: ["name"] },
        { path: "productStatus", select: ["name"] },
        { path: "package" },
      ],
      lean: true,
      offset: offset,
      limit: limit,
    };
    let condition = {};
    const packages = await Order.paginate(condition, options);
    res.json({
      data: packages.docs,
      total: packages.totalDocs,
      totalPages: packages.totalPages,
      currentPage: packages.page,
    });
  } catch (error) {
    res.json(error);
  }
});

orderRoute.get("/:id", Auth, async (req, res) => {
  try {
    let { id } = req.params;
    let order = await Order.findById(id);
    let output = [];
    res.json(output);
  } catch (error) {
    res.json({ message: error.message });
    console.log(error);
  }
});
orderRoute.post("/", async (req, res) => {
  try {
    let { data } = req.fields;
    if (data) {
      data = JSON.parse(data);
      //   let createBy = {
      //     id: req.user.id,
      //     name: `${req.user.firstname} ${req.user.lastname}`,
      //     email: req.user.email,
      //     phone: req.user.phone,
      //   };
      //   data["user"] = createBy;
      const resultOrder = await Order.create(data);
      res.json(resultOrder);
    } else {
      res.json({ message: "ไม่พบข้อมูล" });
    }
  } catch (error) {
    res.json({ message: error.message });
    console.log(error);
  }
});

export default orderRoute;
