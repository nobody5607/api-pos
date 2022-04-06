import express from "express";
import Unit from "../models/UnitModel";
import Category from "../models/CategoryModel";
import Brand from "../models/BrandModel";
import { uploadImage } from "../utils/utils";
const attributeRoute = express.Router();

attributeRoute.post("/category", async (req, res) => {
  try {
    let { data } = req.fields;

    let dataArray = data.split(",");
    let dataObj = [];
    for (let i of dataArray) {
      dataObj.push({ name: i });
    }
    let result = await Category.insertMany(dataObj);
    return res.json(result);
  } catch (error) {
    res.json(error);
  }
});
attributeRoute.post("/brand", async (req, res) => {
  try {
    let { data } = req.fields;

    let dataArray = data.split(",");
    let dataObj = [];
    for (let i of dataArray) {
      dataObj.push({ name: i });
    }
    let result = await Brand.insertMany(dataObj);
    return res.json(result);
  } catch (error) {
    res.json(error);
  }
});
export default attributeRoute;
