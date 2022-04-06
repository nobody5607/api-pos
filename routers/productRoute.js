import express from "express";
import { Auth } from "../middlewere/Auth";
import Product from "../models/ProductModel";
import Unit from "../models/UnitModel";
import Category from "./../models/CategoryModel";
import Brand from "./../models/BrandModel";
import { uploadImage } from "./../utils/utils";
const productRoute = express.Router();
const getPagination = (page, size) => {
  const limit = size ? +size : 1000;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
productRoute.get("/attribute", async (req, res) => {
  try {
    const categorys = await Category.find();
    const units = await Unit.find();
    const brands = await Brand.find();
    const output = {
      categorys: categorys,
      units: units,
      brands: brands,
    };

    return res.json(output);
  } catch (error) {
    res.json(error);
  }
});
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
    const result = await Product.findById(id).populate([
      { path: "branch", select: ["name"] },
      { path: "units", select: ["name"] },
      { path: "categorys", select: ["name"] },
      { path: "brand", select: ["name"] },
    ]);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
productRoute.post("/", Auth, async (req, res) => {
  try {
    let data = req.fields;
    let user = req.user;
    let productImages = "";
    data["user_create"] = user.id;
    if (Object.keys(req.files).length > 0) {
      for (let i in req.files) {
        let result = await uploadImage({ file: req.files[i] });
        productImages = `${process.env.IMAGE_URL}/uploads/images/${result}`;
      }
      data["image"] = productImages;
    }
    if (data.id) {
      const result = await Product.findOneAndUpdate(
        { _id: data.id },
        {
          $set: data,
        },
        {
          upsert: true,
          returnDocument: "after", // this is new !
        }
      );
      return res.json(result);
    } else {
      let result = await Product.insertMany(data);
      return res.json(result);
    }
  } catch (error) {
    res.json(error);
  }
});
export default productRoute;
