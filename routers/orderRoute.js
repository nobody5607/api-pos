import express from "express";
import { Auth } from "../middlewere/Auth";
import Order from "../models/OrderModel";
import { uploadImage } from "../utils/utils";
import moment from "moment";
import Product from "../models/ProductModel";
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
    let result = await Order.findById(id);
    if (!result) {
      res.json({ status: "warning", data: [], message: "ไม่พบข้อมูลลูกค้า" });
    }
    res.json({ status: "success", data: result ? result : [] });
  } catch (error) {
    res.json({ message: error.message });
    console.log(error);
  }
});
orderRoute.post("/", Auth, async (req, res) => {
  try {
    let { data } = req.fields;
    if (data) {
      data = JSON.parse(data);
      data["sell"] = req.user.id;

      //update stock
      if (data.orderItems) {
        for (let i of data.orderItems) {
          const productSearch = await Product.findById(i.product_id);
          const product = await Product.findOneAndUpdate(
            { _id: i.product_id },
            {
              $set: { stock: productSearch.stock - i.product_qty },
            },
            {
              upsert: true,
              returnDocument: "after", // this is new !
            }
          );
        }
      }

      const resultOrder = await Order.create(data);
      return res.json({ status: "success", data: resultOrder });
    } else {
      return res.json({ status: "error", message: "ไม่พบข้อมูล" });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

export default orderRoute;
