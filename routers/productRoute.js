import express from "express";
import { Auth } from "../middlewere/Auth";
import Category from "../models/CategoryModel";
import Product from "../models/ProductModel";
const productRoute = express.Router();
const getPagination = (page, size) => {
  const limit = size ? +size : 1000;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
productRoute.get("/barcode/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findOne({ barcode_code: id }).populate([
      { path: "branch", select: ["name"] },
      { path: "units", select: ["name"] },
      { path: "categorys", select: ["name"] },
      { path: "brand", select: ["name"] },
    ]);
    return res.json(result);
  } catch (error) {
    res.json(error);
  }
});
productRoute.get("/", async (req, res) => {
  try {
    const { page, size, title } = req.query;
    const { limit, offset } = getPagination(page - 1, size);
    var options = {
      //sort: { date: -1 },
      populate: [
        { path: "branch", select: ["name"] },
        { path: "units", select: ["name"] },
        { path: "categorys", select: ["name"] },
        { path: "brand", select: ["name"] },
      ],
      lean: true,
      offset: offset,
      limit: limit,
    };

    const result = await Product.paginate({}, options);

    res.json({
      data: result.docs,
      total: result.totalDocs,
      total_ages: result.totalPages,
      current_page: result.page,
    });
  } catch (error) {
    res.json(error);
  }
});
productRoute.get("/:id", Auth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findById(id).populate(
      { path: "units", select: ["name"] },
      { path: "categorys", select: ["name"] }
    );
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
productRoute.post("/", Auth, async (req, res) => {
  try {
    const dataObj = {
      name: "",
      image: "",
      cost: 50,
      price: 100,
      categorys: [],
      stock: 100,
      units: [],
      weight: 10.0,
      barcode_code: "0001",
      cost_discount_price: 0,
      min_stock: 5,
      enable_rounding: true,
      sale: "",
      customer: "",
    };
    const result = await Product.insertMany(dataObj);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
export default productRoute;
